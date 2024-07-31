import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateDeviceModel } from "@ip-resolver/shared/models";

export class PutDeviceDto {
  @IsOptional()
  @IsString()
  description?: string;
}
