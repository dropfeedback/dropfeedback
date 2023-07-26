import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../types';
import { Request } from 'express';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        AccessTokenStrategy.extractJWTFromCookie,
      ]),
      secretOrKey: config.get<string>('ACCESS_TOKEN_SECRET'),
    });
  }

  private static extractJWTFromCookie(req: Request): string | null {
    if ('accessToken' in req?.cookies) {
      return req.cookies.accessToken;
    }

    return null;
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
