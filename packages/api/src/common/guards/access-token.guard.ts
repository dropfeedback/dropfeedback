import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { UserProviderType } from '@prisma/client';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    return super.canActivate(context);
  }

  handleRequest(err, user, _info, context: ExecutionContext) {
    if (err || !user) {
      const response = context.switchToHttp().getResponse();
      response.clearCookie('accessToken');

      throw err || new UnauthorizedException();
    }

    // get this value from the controller decorator
    // ex: @EmailVerificationIsNotRequired():  true | undefined
    // if the decorator is not present then the value will be `undefined`. it means that the email verification is required
    const isEmailRequired = !this.reflector.getAllAndOverride(
      'emailVerificationIsNotRequired',
      [context.getHandler(), context.getClass()],
    );

    if (
      isEmailRequired &&
      user.provider === UserProviderType.internal &&
      !user.isEmailVerified
    ) {
      throw new ForbiddenException('Email is not verified');
    }

    return user;
  }
}
