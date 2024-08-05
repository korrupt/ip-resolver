import { Module, ValidationPipe } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresFeatureModule } from "@ip-resolver/nest/postgres/feature";
import { NestDeviceFeatureModule } from '@ip-resolver/nest/device/feature';
import { APP_PIPE } from '@nestjs/core';
import { NestAuthFeatureModule } from '@ip-resolver/nest/auth/feature';
import { NestUserFeatureModule } from '@ip-resolver/nest/user/feature';


@Module({
  imports: [
    PostgresFeatureModule,
    NestDeviceFeatureModule,
    NestAuthFeatureModule,
    NestUserFeatureModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ transform: true, whitelist: true })
    },
    AppService
  ],
})
export class AppModule {}
