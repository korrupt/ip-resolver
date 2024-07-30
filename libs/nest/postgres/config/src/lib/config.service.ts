import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

/* eslint-disable @typescript-eslint/no-non-null-assertion */

@Injectable()
export class PostgresConfigService {
  constructor(private conf: ConfigService){}

  get HOST(): string {
    return this.conf.get('postgres.HOST')!;
  }

  get PORT(): number {
    return this.conf.get('postgres.PORT')!;
  }

  get USER(): string {
    return this.conf.get('postgres.USER')!;
  }

  get PASSWORD(): string {
    return this.conf.get('postgres.PASSWORD')!;
  }

  get DATABASE(): string {
    return this.conf.get('postgres.DB')!;
  }

  get SYNC(): boolean {
    return this.conf.get('postgres.SYNC')!;
  }
}
