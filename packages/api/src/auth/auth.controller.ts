import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInLocalDto, SignUpLocalDto } from './dto';
import type { JwtPayload, JwtPayloadWithRefreshToken } from './types';
import { RefreshTokenGuard } from 'src/common/guards';
import {
  EmailVerificationIsNotRequired,
  GetCurrentUser,
  Public,
} from 'src/common/decorators';

import { OAuth2Client } from 'google-auth-library';
import { GoogleLoginDto } from './dto/google-login.dto';
import { VerifyEmailDto } from './dto/verify-email';
import { UserProviderType } from '@prisma/client';

@Controller('auth')
export class AuthController {
  googleClient = new OAuth2Client();

  constructor(private authService: AuthService) {}

  @Post('/local/signup')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  async signupLocal(@Body() dto: SignUpLocalDto) {
    const data = await this.authService.signupLocal(dto);

    await this.authService.updateRefreshTokenFromDB({
      id: data.id,
      refreshToken: data.tokens.refreshToken,
    });

    return {
      ...data.tokens,
    };
  }

  @Post('/local/signin')
  @Public()
  @HttpCode(HttpStatus.OK)
  async signinLocal(@Body() dto: SignInLocalDto) {
    const data = await this.authService.signinLocal(dto);

    await this.authService.updateRefreshTokenFromDB({
      id: data.id,
      refreshToken: data.tokens.refreshToken,
    });

    return {
      ...data.tokens,
    };
  }

  @Post('/local/verify-email')
  @Public()
  @EmailVerificationIsNotRequired()
  @HttpCode(HttpStatus.OK)
  async verifyEmail(@Body() dto: VerifyEmailDto) {
    const { id, email } = await this.authService.verifyEmail(
      dto.emailVerificationToken,
    );

    const { accessToken, refreshToken } = await this.authService.signAuthToken({
      provider: UserProviderType.internal,
      sub: id,
      email,
      isEmailVerified: true,
      iss: 'dropfeedback.com',
    } satisfies JwtPayload);

    await this.authService.updateRefreshTokenFromDB({
      id,
      refreshToken: refreshToken,
    });

    return { accessToken, refreshToken };
  }

  @Post('/local/send-verification-email')
  @EmailVerificationIsNotRequired()
  @HttpCode(HttpStatus.OK)
  async sendVerificationEmail(@GetCurrentUser() user: JwtPayload) {
    this.authService.sendVerificationMail({ email: user.email });
  }

  @Post('/local/reset-password')
  @EmailVerificationIsNotRequired()
  @Public()
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() dto: { email: string }) {
    await this.authService.resetPassword(dto.email);
  }

  @Post('/local/change-password')
  @EmailVerificationIsNotRequired()
  @Public()
  @HttpCode(HttpStatus.OK)
  async changePassword(
    @Body() dto: { password: string; passwordResetToken: string },
  ) {
    const { id, email } = await this.authService.changePassword({
      password: dto.password,
      passwordResetToken: dto.passwordResetToken,
    });

    const { accessToken, refreshToken } = await this.authService.signAuthToken({
      provider: UserProviderType.internal,
      sub: id,
      email,
      isEmailVerified: true,
      iss: 'dropfeedback.com',
    } satisfies JwtPayload);

    await this.authService.updateRefreshTokenFromDB({
      id,
      refreshToken: refreshToken,
    });

    return { accessToken, refreshToken };
  }

  @Post('/logout')
  @EmailVerificationIsNotRequired()
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUser() user: JwtPayload) {
    if (!user) {
      return true;
    }

    return this.authService.logout(user.sub);
  }

  @Post('/refresh')
  @Public()
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  async refreshTokens(@GetCurrentUser() user: JwtPayloadWithRefreshToken) {
    const data = await this.authService.refreshTokens({
      id: user.sub,
      refreshToken: user.refreshToken,
    });

    await this.authService.updateRefreshTokenFromDB({
      id: data.id,
      refreshToken: data.tokens.refreshToken,
    });

    return {
      ...data.tokens,
    };
  }

  @Post('/google/login')
  @Public()
  @HttpCode(HttpStatus.OK)
  async googleLogin(@Body() dto: GoogleLoginDto) {
    const ticket = await this.googleClient.verifyIdToken({
      idToken: dto.idToken,
    });
    const payload = ticket.getPayload();
    if (!payload?.email) {
      throw new ForbiddenException("User doesn't have email");
    }

    const data = await this.authService.googleLogin(payload);

    await this.authService.updateRefreshTokenFromDB({
      id: data.id,
      refreshToken: data.tokens.refreshToken,
    });

    return {
      ...data.tokens,
    };
  }
}
