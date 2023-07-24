import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { JwtPayload, JwtPayloadWithRefreshToken, Tokens } from './types';
import { RefreshTokenGuard } from 'src/common/guards';
import { GetCurrentUser, Public } from 'src/common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/local/signup')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signupLocal(dto);
  }

  @Post('/local/signin')
  @Public()
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signinLocal(dto);
  }

  @Public()
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUser() user: JwtPayload) {
    if (!user?.sub) return;
    return this.authService.logout(user.sub);
  }

  @Post('/refresh')
  @ApiBearerAuth('refresh-token')
  @Public()
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  refreshTokens(@GetCurrentUser() user: JwtPayloadWithRefreshToken) {
    return this.authService.refreshTokens({
      id: user.sub,
      refreshToken: user.refreshToken,
    });
  }
}
