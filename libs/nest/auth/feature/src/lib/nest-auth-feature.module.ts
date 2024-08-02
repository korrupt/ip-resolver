import { AuthKeyAccessEntity, AuthKeyEntity } from '@ip-resolver/nest/auth/data-access';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthKeyEntity, AuthKeyAccessEntity])
  ],
  // controllers: [],
  // providers: [],
  exports: [TypeOrmModule],
})
export class NestAuthFeatureModule {}
