import { UserProviderType } from '@prisma/client';

export type JwtPayload = {
  email: string;
  sub: string;
  provider: UserProviderType;
  isEmailVerified: boolean;
  iss: 'dropfeedback.com';
  jti?: string;
};

export type JwtPayloadWithRefreshToken = JwtPayload & { refreshToken: string };
