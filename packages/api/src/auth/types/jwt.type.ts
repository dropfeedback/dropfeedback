export type JwtPayload = {
  email: string;
  sub: string;
};

export type JwtPayloadWithRefreshToken = JwtPayload & { refreshToken: string };
