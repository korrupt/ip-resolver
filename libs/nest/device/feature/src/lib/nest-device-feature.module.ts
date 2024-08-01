import { DeviceEntity, DeviceHeartbeatEntity, NestDeviceController, NestDeviceService } from '@ip-resolver/nest/device/data-access';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([DeviceEntity, DeviceHeartbeatEntity])
  ],
  providers: [NestDeviceService],
  exports: [NestDeviceService],
  controllers: [NestDeviceController]
})
export class NestDeviceFeatureModule {}
