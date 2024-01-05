import { UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {
  constructor() {
    super();
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return user;
  }
}
