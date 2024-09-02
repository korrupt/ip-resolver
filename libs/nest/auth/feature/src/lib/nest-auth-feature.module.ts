import { AclGuard, AuthKeyAccessEntity, AuthKeyEntity, AuthUserEntity, JwtStrategy, NestAppGuard, NestAuthController, NestAuthKeyGuard, NestAuthKeyService, NestAuthService, NestJwtGuard } from '@ip-resolver/nest/auth/data-access';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from '@nestjs/jwt';
import { NestAuthConfigModule, NestAuthConfigService } from "@ip-resolver/nest/auth/config";
import { UserEntity } from '@ip-resolver/nest/user/data-access';

@Module({
  imports: [
    NestAuthConfigModule,
    TypeOrmModule.forFeature([
      AuthKeyEntity,
      AuthKeyAccessEntity,
      AuthUserEntity,
      UserEntity
    ]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [NestAuthConfigModule],
      inject: [NestAuthConfigService],
      useFactory: (conf: NestAuthConfigService) => ({
        secret: conf.JWT_SECRET,
        signOptions: { expiresIn: conf.JWT_EXPIRES_IN },
      })
    })
  ],
  providers: [
    JwtStrategy,
    AclGuard,
    NestAuthService,
    NestAuthKeyService,
  ],
  exports: [TypeOrmModule],
  controllers: [NestAuthController],
})
export class NestAuthFeatureModule {}
