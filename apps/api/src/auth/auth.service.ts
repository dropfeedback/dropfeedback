import {
  ConflictException,
  ForbiddenException,
  NotAcceptableException,
  Injectable,
} from '@nestjs/common';
import { AuthDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignUpWithInviteDto } from './dto/signup-with-invite.dto';

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

  async signupLocal(dto: AuthDto): Promise<Tokens> {
    const hashedPassword = await this.hashData(dto.password);

    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      const newUser = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hashedPassword,
        },
      });

      const tokens = await this.signToken({
        id: newUser.id,
        email: newUser.email,
      });

      await this.updateRefreshToken({
        id: newUser.id,
        refreshToken: tokens.refreshToken,
      });

      return tokens;
    } else if (user && user.isTemporary) {
      throw new NotAcceptableException(
        'You have invitation to join a project, please check your email',
      );
    } else {
      throw new ConflictException('User already exists');
    }
  }

  async signupWithInviteLocal(dto: SignUpWithInviteDto): Promise<Tokens> {
    const safeDecode = this.jwtService.decode(dto.mailToken) as {
      projectMemberId: string;
    };
    if (!safeDecode?.projectMemberId) {
      throw new ForbiddenException('Invalid token');
    }

    const projectMember = await this.prisma.projectMember.findFirst({
      where: {
        id: safeDecode.projectMemberId,
      },
      include: {
        user: true,
      },
    });

    if (!projectMember) {
      throw new ForbiddenException('Invalid token');
    }

    if (projectMember.user.email !== dto.email) {
      throw new ForbiddenException('Invite email and signup email not match');
    }

    try {
      await this.jwtService.verify(dto.mailToken, {
        secret: `${this.config.get<number>('EMAIL_TOKEN_SECRET')}-${
          projectMember.user.id
        }`,
      });
    } catch {
      throw new ForbiddenException('Invalid token');
    }

    const hashedPassword = await this.hashData(dto.password);

    const updatedUser = await this.prisma.user.update({
      where: { id: projectMember.user.id },
      data: { hash: hashedPassword, isTemporary: false },
    });

    await this.prisma.projectMember.update({
      where: { id: projectMember.id },
      data: { state: ProjectMemberState.active },
    });

    const tokens = await this.signToken({
      id: updatedUser.id,
      email: updatedUser.email,
    });

    await this.updateRefreshToken({
      id: updatedUser.id,
      refreshToken: tokens.refreshToken,
    });

    //TODO: account activated mail

    return tokens;
  }

  async signinLocal(dto: AuthDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email, isTemporary: false },
    });
    if (!user) throw new ForbiddenException('Invalid credentials');

    const isPasswordMatches = await bcrypt.compare(dto.password, user.hash);

    if (!isPasswordMatches) throw new ForbiddenException('Invalid credentials');

    const tokens = await this.signToken({
      id: user.id,
      email: user.email,
    });

    await this.updateRefreshToken({
      id: user.id,
      refreshToken: tokens.refreshToken,
    });

    return tokens;
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
  }): Promise<Tokens> {
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

    const tokens = await this.signToken({
      id: user.id,
      email: user.email,
    });

    await this.updateRefreshToken({
      id: user.id,
      refreshToken: tokens.refreshToken,
    });

    return tokens;
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async updateRefreshToken({
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

  async signToken({ id, email }: { id: string; email: string }) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: id, email },
        {
          expiresIn: this.config.get<number>('ACCESS_TOKEN_EXPIRES_IN'),
          secret: this.config.get<string>('ACCESS_TOKEN_SECRET'),
        },
      ),
      this.jwtService.signAsync(
        { sub: id, email },
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

  async acceptInvite({ projectMemberId }: { projectMemberId: string }) {
    return this.prisma.projectMember.update({
      where: { id: projectMemberId },
      data: {
        state: ProjectMemberState.active,
      },
    });
  }
}
