import { User } from '@prisma/client';

export type JwtPayload = {
  email: string;
  sub: string;
  provider: User['authProvider'];
};

export type JwtPayloadWithRefreshToken = JwtPayload & { refreshToken: string };
