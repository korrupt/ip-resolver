import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresFeatureModule } from "@ip-resolver/nest/postgres/feature";
import { NestDeviceFeatureModule } from '@ip-resolver/nest/device/feature';


@Module({
  imports: [PostgresFeatureModule, NestDeviceFeatureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
