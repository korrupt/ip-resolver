import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresFeatureModule } from "@ip-resolver/nest/postgres/feature";


@Module({
  imports: [PostgresFeatureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
