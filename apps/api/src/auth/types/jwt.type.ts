import { UserProviderType } from '@prisma/client';

export type JwtPayload = {
  email: string;
  sub: string;
  provider: UserProviderType;
};

export type JwtPayloadWithRefreshToken = JwtPayload & { refreshToken: string };
