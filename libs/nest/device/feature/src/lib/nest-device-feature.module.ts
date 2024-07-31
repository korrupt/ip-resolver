import { DeviceEntity } from '@ip-resolver/nest/device/data-access';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([DeviceEntity])
  ],
  exports: []
})
export class NestDeviceFeatureModule {}
