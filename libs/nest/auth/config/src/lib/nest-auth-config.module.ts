import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import * as Joi from 'joi';
import { NestAuthConfigService } from './nest-auth-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        AUTH_JWT_SECRET: Joi.string().required(),
        AUTH_JWT_EXPIRES_IN: Joi.string().default("60s")
      })
    })
  ],
  providers: [ConfigService, NestAuthConfigService],
  exports: [ConfigService, NestAuthConfigService],
})
export class NestAuthConfigModule {}
