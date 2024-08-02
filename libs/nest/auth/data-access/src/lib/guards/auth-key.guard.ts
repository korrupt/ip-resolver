import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import type { Request } from 'express';
import { NestAuthKeyService } from "../services/nest-auth-key.service";


@Injectable()
export class NestAuthKeyGuard implements CanActivate {

  constructor(
    private authKey: NestAuthKeyService
  ){}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const http = context.switchToHttp();
    const request = http.getRequest() as Request;

    const auth_key = request.headers['auth-key'];

    if (!auth_key || typeof auth_key !== "string") {
      throw new UnauthorizedException(`Missing "auth-key" header`);
    }

    const found = await this.authKey.findOne(auth_key);

    if (!found) {
      throw new UnauthorizedException(`Specified auth key not found`);
    }

    if (found.expires_at && found.expires_at > new Date()) {
      throw new UnauthorizedException(`Auth key expired`);
    }

    return true;
  }
}
