import { Module, ValidationPipe } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresFeatureModule } from "@ip-resolver/nest/postgres/feature";
import { NestDeviceFeatureModule } from '@ip-resolver/nest/device/feature';
import { APP_PIPE } from '@nestjs/core';


@Module({
  imports: [PostgresFeatureModule, NestDeviceFeatureModule],
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
