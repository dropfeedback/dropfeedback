import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLocalDto } from './dto';
import { JwtPayload, JwtPayloadWithRefreshToken, Tokens } from './types';
import { GithubGuard, RefreshTokenGuard } from 'src/common/guards';
import { GetCurrentUser, Public } from 'src/common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { ConfigService } from '@nestjs/config';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private config: ConfigService,
  ) {}

  @Get('/me')
  @ApiBearerAuth('access-token')
  @HttpCode(HttpStatus.OK)
  async me(@GetCurrentUser() user: JwtPayload) {
    return this.authService.findUserById(user.sub);
  }

  @Post('/local/signup')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  async signupLocal(
    @Body() dto: AuthLocalDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.signupLocal(dto);
    this.setCookies(res, tokens);
  }

  @Post('/local/signin')
  @Public()
  @HttpCode(HttpStatus.OK)
  async signinLocal(
    @Body() dto: AuthLocalDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.signinLocal(dto);
    this.setCookies(res, tokens);
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
  @ApiBearerAuth('refresh-token')
  @Public()
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentUser() user: JwtPayloadWithRefreshToken,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.refreshTokens({
      id: user.sub,
      refreshToken: user.refreshToken,
    });

    this.setCookies(res, tokens);

    return tokens;
  }

  @Get('/github/login')
  @Public()
  @UseGuards(GithubGuard)
  @HttpCode(HttpStatus.OK)
  async githubLogin() {
    return { message: 'Redirecting to github.com' };
  }

  @Get('/github/callback')
  @Public()
  @UseGuards(GithubGuard)
  async githubCallback(@Req() req: Request) {
    console.log('/github/callback', req.user);
    return { message: 'Redirecting to app' };
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
}
