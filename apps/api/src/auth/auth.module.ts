import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import {
  AccessTokenStrategy,
  GithubStrategy,
  RefreshTokenStrategy,
} from './strategies';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          signOptions: {
            expiresIn: configService.get<number>('ACCESS_TOKEN_EXPIRES_IN'),
          },
          secret: configService.get<string>('ACCESS_TOKEN_SECRET'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    GithubStrategy,
  ],
})
export class AuthModule {}
