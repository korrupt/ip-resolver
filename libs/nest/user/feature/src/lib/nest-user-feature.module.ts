import { NestUserService, UserEntity } from '@ip-resolver/nest/user/data-access';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [NestUserService],
  exports: [NestUserService],
})
export class NestUserFeatureModule {}
