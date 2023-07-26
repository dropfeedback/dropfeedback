import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async signupLocal(dto: AuthDto): Promise<Tokens> {
    try {
      const hashedPassword = await this.hashData(dto.password);

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
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('User already exists');
      }

      throw new ForbiddenException('Credentials incorrect');
    }
  }

  async signinLocal(dto: AuthDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
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
}
