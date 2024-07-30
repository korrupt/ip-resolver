import { Module } from '@nestjs/common';
import { PostgresConfigService, PostgresConfigModule } from "@ip-resolver/nest/postgres/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import 'pg';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [PostgresConfigModule],
      inject: [PostgresConfigService],
      useFactory: (conf: PostgresConfigService) => ({
        type: 'postgres',
        host: conf.HOST,
        port: conf.PORT,
        username: conf.USER,
        password: conf.PASSWORD,
        database: conf.DATABASE,
        synchronize: conf.SYNC,
        autoLoadEntities: true,
      })
    })
  ],
  exports: [TypeOrmModule]
})
export class PostgresFeatureModule {}
