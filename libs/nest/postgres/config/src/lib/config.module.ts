import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PostgresConfigService } from './config.service';

import configuration from './configuration';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().default('postgres'),
        POSTGRES_PORT: Joi.number().default(5431),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().default('ip-resolver'),
        POSTGRES_SYNC: Joi.bool().default(false),
      })
    })
  ],
  providers: [
    ConfigService,
    PostgresConfigService,
  ],
  exports: [
    ConfigService,
    PostgresConfigService,
  ],
})
export class PostgresConfigModule {}
