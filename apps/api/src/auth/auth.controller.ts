import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInLocalDto, SignUpLocalDto } from './dto';
import type { JwtPayload, JwtPayloadWithRefreshToken, Tokens } from './types';
import { RefreshTokenGuard } from 'src/common/guards';
import {
  EmailVerificationIsNotRequired,
  GetCurrentUser,
  Public,
} from 'src/common/decorators';

import type { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { GoogleLoginDto } from './dto/google-login.dto';
import { VerifyEmailDto } from './dto/verify-email';
import { UserProviderType } from '@prisma/client';

@Controller('auth')
export class AuthController {
  googleClient = new OAuth2Client();

  constructor(
    private authService: AuthService,
    private config: ConfigService,
  ) {}

  @Get('/me')
  @EmailVerificationIsNotRequired()
  @HttpCode(HttpStatus.OK)
  async me(@GetCurrentUser() jwtPayload: JwtPayload) {
    const user = await this.authService.me(jwtPayload.sub);
    return {
      ...user,
      provider: jwtPayload.provider,
      isEmailVerified: jwtPayload.isEmailVerified,
    };
  }

  @Post('/local/signup')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  async signupLocal(
    @Body() dto: SignUpLocalDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.signupLocal(dto);

    await this.authService.updateRefreshTokenFromDB({
      id: data.id,
      refreshToken: data.tokens.refreshToken,
    });

    this.setCookies(res, data.tokens);
  }

  @Post('/local/signin')
  @Public()
  @HttpCode(HttpStatus.OK)
  async signinLocal(
    @Body() dto: SignInLocalDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.signinLocal(dto);

    await this.authService.updateRefreshTokenFromDB({
      id: data.id,
      refreshToken: data.tokens.refreshToken,
    });

    this.setCookies(res, data.tokens);
  }

  @Post('/local/verify-email')
  @Public()
  @EmailVerificationIsNotRequired()
  @HttpCode(HttpStatus.OK)
  async verifyEmail(
    @Body() dto: VerifyEmailDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { id, email } = await this.authService.verifyEmail(
      dto.emailVerificationToken,
    );

    const { accessToken, refreshToken } = await this.authService.signAuthToken({
      provider: UserProviderType.internal,
      sub: id,
      email,
      isEmailVerified: true,
    } satisfies JwtPayload);

    await this.authService.updateRefreshTokenFromDB({
      id,
      refreshToken: refreshToken,
    });

    this.setCookies(res, { accessToken, refreshToken });

    return {};
  }

  @Post('/local/send-verification-email')
  @EmailVerificationIsNotRequired()
  @HttpCode(HttpStatus.OK)
  async sendVerificationEmail(@GetCurrentUser() user: JwtPayload) {
    this.authService.sendVerificationMail({ email: user.email });
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(
    @GetCurrentUser() user: JwtPayload,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.clearCookie('accessToken', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    res.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    return this.authService.logout(user.sub);
  }

  @Post('/refresh')
  @Public()
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentUser() user: JwtPayloadWithRefreshToken,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.refreshTokens({
      id: user.sub,
      refreshToken: user.refreshToken,
    });

    await this.authService.updateRefreshTokenFromDB({
      id: data.id,
      refreshToken: data.tokens.refreshToken,
    });

    this.setCookies(res, data.tokens);
  }

  @Post('/google/login')
  @Public()
  @HttpCode(HttpStatus.OK)
  async googleLogin(
    @Body() dto: GoogleLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const ticket = await this.googleClient.verifyIdToken({
      idToken: dto.idToken,
      audience: this.config.get<string>('GOOGLE_CLIENT_ID'),
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

    this.setCookies(res, data.tokens);
  }

  setCookies(res: Response, tokens: Tokens) {
    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });
  }
}
