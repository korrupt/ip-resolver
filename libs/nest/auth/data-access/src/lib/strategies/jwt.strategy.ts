import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { NestAuthConfigService } from "@ip-resolver/nest/auth/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private conf: NestAuthConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: conf.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
