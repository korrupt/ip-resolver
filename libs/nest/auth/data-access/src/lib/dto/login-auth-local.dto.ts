import { LoginAuthLocalModel } from "@ip-resolver/shared/models";
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class LoginAuthLocalDto implements LoginAuthLocalModel {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;

  @IsOptional()
  @IsBoolean()
  remember?: boolean;
}
