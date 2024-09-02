import { CreateAuthLocalModel } from "@ip-resolver/shared/models";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class  CreateAuthLocalDto implements CreateAuthLocalModel {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsStrongPassword({})
  password!: string;
}
