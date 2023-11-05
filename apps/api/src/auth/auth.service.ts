import {
  ConflictException,
  ForbiddenException,
  NotAcceptableException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { AuthDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtPayload, Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ProjectMemberState, UserProviderType } from '@prisma/client';
import { TokenPayload as GoogleTokenPayload } from 'google-auth-library';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async me(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true },
    });
  }

  async signupLocal(dto: AuthDto) {
    const hashedPassword = await this.hashData(dto.password);

    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: {
        UserProvider: true,
      },
    });

    if (user) {
      const hasInternalProvider = !!user?.UserProvider?.some(
        (provider) => provider.type === UserProviderType.Internal,
      );
      if (hasInternalProvider) {
        throw new ConflictException('User already exists');
      }

      await this.prisma.userProvider.create({
        data: {
          type: UserProviderType.Internal,
          hash: hashedPassword,
          userId: user.id,
        },
      });

      const tokens = await this.signToken({
        email: user.email,
        sub: user.id,
        provider: UserProviderType.Internal,
      } satisfies JwtPayload);
      return { tokens, id: user.id };
    } else {
      const newUser = await this.prisma.user.create({
        data: {
          email: dto.email,
          UserProvider: {
            create: {
              type: UserProviderType.Internal,
              hash: hashedPassword,
            },
          },
        },
      });

      const tokens = await this.signToken({
        email: newUser.email,
        sub: newUser.id,
        provider: UserProviderType.Internal,
      } satisfies JwtPayload);
      return { tokens, id: newUser.id };
    }
  }

  async signinLocal(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: {
        UserProvider: true,
      },
    });

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const internalProvider = user?.UserProvider?.find(
      (provider) => provider.type === UserProviderType.Internal,
    );
    if (!internalProvider) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordMatches = await bcrypt.compare(
      dto.password,
      internalProvider?.hash || '',
    );
    if (!isPasswordMatches)
      throw new BadRequestException('Invalid credentials');

    const tokens = await this.signToken({
      sub: user.id,
      email: user.email,
      provider: UserProviderType.Internal,
    });

    return { tokens, id: user.id };
  }

  async logout(userId: string) {
    try {
      await this.prisma.user.update({
        where: {
          id: userId,
          hashedRefreshToken: {
            not: null,
          },
        },
        data: { hashedRefreshToken: null },
      });
    } catch (error) {
    } finally {
      return true;
    }
  }

  async refreshTokens({
    id,
    refreshToken,
  }: {
    id: string;
    refreshToken: string;
  }) {
    if (!refreshToken) throw new ForbiddenException('Invalid token');

    const user = await this.prisma.user.findUnique({
      where: {
        id,
        hashedRefreshToken: {
          not: null,
        },
      },
    });
    if (!user) throw new ForbiddenException('Invalid credentials');

    const isRefreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.hashedRefreshToken,
    );
    if (!isRefreshTokenMatches) throw new ForbiddenException('Invalid token');

    const decodedToken = this.jwtService.decode(refreshToken) as JwtPayload;

    const tokens = await this.signToken({
      sub: user.id,
      email: user.email,
      provider: decodedToken.provider,
    });

    return { tokens, id: user.id };
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async updateRefreshTokenFromDB({
    id,
    refreshToken,
  }: {
    id: string;
    refreshToken: string;
  }) {
    const hashedRefreshToken = await this.hashData(refreshToken);

    await this.prisma.user.update({
      where: { id },
      data: { hashedRefreshToken },
    });
  }

  async acceptInvite({ projectMemberId }: { projectMemberId: string }) {
    return this.prisma.projectMember.update({
      where: { id: projectMemberId },
      data: {
        state: ProjectMemberState.active,
      },
    });
  }

  async sendInviteEmails(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        projectMember: { where: { state: ProjectMemberState.pending } },
      },
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    if (user.projectMember.length === 0) {
      throw new ForbiddenException('User not invited to any project');
    }

    //TODO: we can set limit to send invite emails

    for (const projectMember of user.projectMember) {
      const mailToken = await this.jwtService.signAsync(
        { projectMemberId: projectMember.id },
        {
          expiresIn: this.config.get<number>('EMAIL_TOKEN_EXPIRES_IN'),
          secret: `${this.config.get<number>('EMAIL_TOKEN_SECRET')}-${user.id}`,
        },
      );

      console.log('email sended');

      //TODO: send invite mail for each project member
    }
  }

  async googleLogin(payload: GoogleTokenPayload) {
    const user = await this.prisma.user.findUnique({
      where: { email: payload.email },
      include: {
        UserProvider: true,
      },
    });

    const tokenPayload: JwtPayload = {
      email: user?.email,
      sub: user?.id,
      provider: UserProviderType.Google,
    };

    if (!user) {
      const newUser = await this.prisma.user.create({
        data: {
          email: payload.email,
          UserProvider: {
            create: {
              type: UserProviderType.Google,
            },
          },
        },
      });

      tokenPayload.sub = newUser.id;
      tokenPayload.email = newUser.email;
    }

    const hasGoogleProvider = !!user?.UserProvider?.some(
      (provider) => provider.type === UserProviderType.Google,
    );
    if (user && hasGoogleProvider) {
      await this.prisma.userProvider.create({
        data: {
          type: UserProviderType.Google,
          userId: user.id,
        },
      });
    }

    const tokens = await this.signToken(tokenPayload);
    return { tokens, id: tokenPayload.sub };
  }
  async signToken({ sub, email, provider }: JwtPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub, email, provider },
        {
          expiresIn: this.config.get<number>('ACCESS_TOKEN_EXPIRES_IN'),
          secret: this.config.get<string>('ACCESS_TOKEN_SECRET'),
        },
      ),
      this.jwtService.signAsync(
        { sub, email, provider },
        {
          expiresIn: this.config.get<number>('REFRESH_TOKEN_EXPIRES_IN'),
          secret: this.config.get<string>('REFRESH_TOKEN_SECRET'),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
