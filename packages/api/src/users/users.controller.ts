import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import {
  EmailVerificationIsNotRequired,
  GetCurrentUser,
} from 'src/common/decorators';

import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

import type { JwtPayload } from 'src/auth/types';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/me')
  @EmailVerificationIsNotRequired()
  @HttpCode(HttpStatus.OK)
  async me(@GetCurrentUser() user: JwtPayload) {
    return this.usersService.me({
      userId: user.sub,
      userProviderType: user.provider,
    });
  }

  @Patch('/me')
  @HttpCode(HttpStatus.OK)
  async updateMe(
    @GetCurrentUser() user: JwtPayload,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.updateMe(user.sub, dto);
  }
}
