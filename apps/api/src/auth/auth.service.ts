import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthLocalDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtPayload, Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GithubBio } from 'src/types';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async findUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true },
    });
  }

  async signupLocal(dto: AuthLocalDto): Promise<Tokens> {
    try {
      await this.throwIfAuthProviderIsNotValid(dto.email, 'local');

      const hashedPassword = await this.hashData(dto.password);

      const newUser = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hashedPassword,
          authProvider: 'local',
        },
      });

      const tokens = await this.signToken({
        id: newUser.id,
        email: newUser.email,
        provider: newUser.authProvider,
      });

      await this.updateRefreshToken({
        id: newUser.id,
        refreshToken: tokens.refreshToken,
      });

      return tokens;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('User already exists');
      }

      throw new ForbiddenException('Credentials incorrect');
    }
  }

  async signinLocal(dto: AuthLocalDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new ForbiddenException('Invalid credentials');

    const isPasswordMatches = await bcrypt.compare(dto.password, user.hash);

    if (!isPasswordMatches) throw new ForbiddenException('Invalid credentials');

    const tokens = await this.signToken({
      id: user.id,
      email: user.email,
      provider: user.authProvider,
    });

    await this.updateRefreshToken({
      id: user.id,
      refreshToken: tokens.refreshToken,
    });

    return tokens;
  }

  async signInGithub(githubBio: GithubBio): Promise<Tokens> {
    const { email } = githubBio;

    await this.throwIfAuthProviderIsNotValid(email, 'github');

    const updatedUser = await this.prisma.user.upsert({
      where: { email, authProvider: 'github' },
      update: { email, updatedAt: new Date() },
      create: {
        email,
        authProvider: 'github',
      },
    });

    const tokens = await this.signToken({
      id: updatedUser.id,
      email: updatedUser.email,
      provider: updatedUser.authProvider,
    });

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
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

  async throwIfAuthProviderIsNotValid(
    email: string,
    provider: User['authProvider'],
  ) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user.authProvider !== provider) {
      throw new ConflictException({
        message: 'User already exists',
        email,
        provider: user.authProvider,
      });
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
      provider: user.authProvider,
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

  async signToken({
    id,
    email,
    provider,
  }: {
    id: string;
    email: string;
    provider: User['authProvider'];
  }) {
    const payload: JwtPayload = { sub: id, email, provider };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
