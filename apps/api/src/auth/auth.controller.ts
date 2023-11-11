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
import { AuthDto } from './dto';
import type { JwtPayload, JwtPayloadWithRefreshToken, Tokens } from './types';
import { RefreshTokenGuard } from 'src/common/guards';
import { GetCurrentUser, Public } from 'src/common/decorators';

import type { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { MemberInviteState } from '@prisma/client';
import { OAuth2Client } from 'google-auth-library';
import { AcceptInviteBodyDto } from './dto/accept-invite-body.dto';
import { GoogleLoginDto } from './dto/google-login.dto';

@Controller('auth')
export class AuthController {
  googleClient = new OAuth2Client();

  constructor(
    private authService: AuthService,
    private config: ConfigService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  @Get('/me')
  @HttpCode(HttpStatus.OK)
  async me(@GetCurrentUser() user: JwtPayload) {
    return this.authService.me(user.sub);
  }

  @Post('/local/signup')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  async signupLocal(
    @Body() dto: AuthDto,
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
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.signinLocal(dto);

    await this.authService.updateRefreshTokenFromDB({
      id: data.id,
      refreshToken: data.tokens.refreshToken,
    });

    this.setCookies(res, data.tokens);
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

  @Post('/accept-invite')
  @Public()
  @HttpCode(HttpStatus.OK)
  async acceptInvite(@Body() dto: AcceptInviteBodyDto) {
    const safeDecode = this.jwtService.decode(dto.acceptInviteToken) as {
      email: string;
      projectId: string;
    };
    if (!safeDecode?.email || !safeDecode?.projectId) {
      throw new ForbiddenException('Invalid token');
    }

    try {
      await this.jwtService.verify(dto.acceptInviteToken, {
        secret: `${this.config.get<number>('EMAIL_TOKEN_SECRET')}-${
          safeDecode.email
        }`,
      });
    } catch {
      throw new ForbiddenException('Invalid token');
    }

    const memberInvite = await this.prisma.memberInvite.findFirst({
      where: {
        projectId: safeDecode.projectId,
        email: safeDecode.email,
      },
    });

    if (memberInvite.state !== MemberInviteState.Pending) {
      throw new ForbiddenException('You already accepted or rejected invite');
    }

    await this.authService.acceptInvite({
      email: safeDecode.email,
      projectId: safeDecode.projectId,
    });
  }

  setCookies(res: Response, tokens: Tokens) {
    const accessTokenExpires = this.config.get<number>(
      'ACCESS_TOKEN_EXPIRES_IN',
    );

    const refreshTokenExpires = this.config.get<number>(
      'REFRESH_TOKEN_EXPIRES_IN',
    );

    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      expires: new Date(Date.now() + accessTokenExpires),
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      expires: new Date(Date.now() + refreshTokenExpires),
    });
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
}
