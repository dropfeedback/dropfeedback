import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload, JwtPayloadWithRefreshToken } from '../../auth/types';

export const GetCurrentUser = createParamDecorator(
  (_, context: ExecutionContext): JwtPayloadWithRefreshToken | JwtPayload => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayloadWithRefreshToken | JwtPayload;
    return user;
  },
);
