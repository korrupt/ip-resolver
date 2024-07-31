import { DeviceEntity, NestDeviceService } from '@ip-resolver/nest/device/data-access';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([DeviceEntity])
  ],
  providers: [NestDeviceService],
  exports: [NestDeviceService]
})
export class NestDeviceFeatureModule {}
