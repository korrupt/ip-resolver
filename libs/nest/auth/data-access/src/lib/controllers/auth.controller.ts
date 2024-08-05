import { Body, Controller, Post } from "@nestjs/common";
import { NestAuthService } from "../services";
import { CreateAuthLocalDto, LoginAuthLocalDto } from "../dto";
import { AccessToken, CreateAuthLocalResult } from "@ip-resolver/shared/models";


@Controller('auth')
export class NestAuthController {
  constructor(
    private auth: NestAuthService
  ){}

  @Post('local/new')
  public async createLocalUser(@Body() dto: CreateAuthLocalDto): Promise<CreateAuthLocalResult> {
    return this.auth.createAuthLocalUser(dto);
  }

  @Post('local')
  public async loginLocalUser(@Body() dto: LoginAuthLocalDto): Promise<AccessToken> {
    return this.auth.loginAuthLocalUser(dto);
  }
}
