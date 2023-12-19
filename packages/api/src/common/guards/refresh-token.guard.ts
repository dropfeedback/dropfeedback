import { ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {
  constructor() {
    super();
  }

  handleRequest(err, user, _info, context) {
    if (err || !user) {
      const response = context.switchToHttp().getResponse();
      response.clearCookie('accessToken');
      response.clearCookie('refreshToken');

      throw err || new ForbiddenException();
    }

    return user;
  }
}
