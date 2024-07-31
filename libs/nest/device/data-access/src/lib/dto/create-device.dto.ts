import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateDeviceModel } from "@ip-resolver/shared/models";

export class CreateDeviceDto implements CreateDeviceModel {
  @IsNotEmpty()
  @IsString()
  id!: string;

  @IsOptional()
  @IsString()
  description?: string;
}
