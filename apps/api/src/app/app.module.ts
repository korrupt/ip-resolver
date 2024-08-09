import { NestCoreModule } from "@ip-resolver/nest/core";
import { Module } from "@nestjs/common";

@Module({
  imports: [NestCoreModule]
})
export class AppModule {}
