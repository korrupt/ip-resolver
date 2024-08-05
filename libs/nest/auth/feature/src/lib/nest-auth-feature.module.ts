import { AuthKeyAccessEntity, AuthKeyEntity, AuthUserEntity, JwtStrategy, NestAppGuard, NestAuthKeyGuard, NestAuthKeyService, NestAuthService, NestJwtGuard } from '@ip-resolver/nest/auth/data-access';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from "@nestjs/passport";
import { JwtModule, JwtService } from '@nestjs/jwt';
import { NestAuthConfigModule, NestAuthConfigService } from "@ip-resolver/nest/auth/config";

@Module({
  imports: [
    NestAuthConfigModule,
    TypeOrmModule.forFeature([
      AuthKeyEntity,
      AuthKeyAccessEntity,
      AuthUserEntity
    ]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [NestAuthConfigModule],
      inject: [NestAuthConfigService],
      useFactory: (conf: NestAuthConfigService) => ({
        secret: conf.JWT_SECRET,
        signOptions: { expiresIn: conf.JWT_EXPIRES_IN }
      })
    })
  ],
  providers: [
    JwtService,
    JwtStrategy,
    NestJwtGuard,
    NestAuthKeyGuard,
    NestAppGuard,
    NestAuthService,
    NestAuthKeyService,
  ],
  exports: [TypeOrmModule, JwtService],
})
export class NestAuthFeatureModule {}
