import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

/* eslint-disable @typescript-eslint/no-non-null-assertion */
@Injectable()
export class NestAuthConfigService {

  constructor(private conf: ConfigService){}

  get JWT_SECRET(): string {
    return this.conf.get('auth.JWT_SECRET')!;
  }

  get JWT_EXPIRES_IN(): string {
    return this.conf.get('auth.JWT_EXPIRES_IN')!;
  }
}
