import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { JwtPayload, JwtPayloadWithRefreshToken, Tokens } from './types';
import { RefreshTokenGuard } from 'src/common/guards';
import { GetCurrentUser, Public } from 'src/common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectMemberState } from '@prisma/client';
import { AcceptInviteBodyDto } from './dto/accept-invite-body.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private config: ConfigService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  @Get('/me')
  @ApiBearerAuth('access-token')
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
    const tokens = await this.authService.signupLocal(dto);
    this.setCookies(res, tokens);
  }

  @Post('/local/signin')
  @Public()
  @HttpCode(HttpStatus.OK)
  async signinLocal(
    @Body() dto: AuthDto,
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

  @Post('/accept-invite')
  @Public()
  @HttpCode(HttpStatus.OK)
  async acceptInvite(@Body() dto: AcceptInviteBodyDto) {
    const safeDecode = this.jwtService.decode(dto.acceptInviteToken) as {
      projectMemberId: string;
    };
    if (!safeDecode?.projectMemberId) {
      throw new ForbiddenException('Invalid token');
    }

    const projectMember = await this.prisma.projectMember.findUnique({
      where: {
        id: safeDecode.projectMemberId,
      },
      include: { user: true },
    });

    if (!projectMember) {
      throw new ForbiddenException('Invalid token');
    }

    if (projectMember.state === ProjectMemberState.active) {
      throw new ForbiddenException('User already accepted invite');
    }

    try {
      await this.jwtService.verify(dto.acceptInviteToken, {
        secret: `${this.config.get<number>('EMAIL_TOKEN_SECRET')}-${
          projectMember.user.id
        }`,
      });
    } catch {
      throw new ForbiddenException('Invalid token');
    }

    await this.authService.acceptInvite({
      projectMemberId: projectMember.id,
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
}
