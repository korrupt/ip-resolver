import { CanActivate, ExecutionContext, HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import type { Request } from 'express';
import { NestAuthKeyService } from "../services/nest-auth-key.service";

type CanActivateResult = { canActivate: true } | { canActivate: false; exception: HttpException };


@Injectable()
export class NestAuthKeyGuard implements CanActivate {

  constructor(
    private authKey: NestAuthKeyService
  ){}

  public async canActivateSilent(context: ExecutionContext): Promise<CanActivateResult> {
    const http = context.switchToHttp();
    const request = http.getRequest() as Request;

    const auth_key = request.headers['auth-key'];

    if (!auth_key || typeof auth_key !== "string") {
      return { canActivate: false, exception: new UnauthorizedException(`Missing "auth-key" header`) };
    }

    const found = await this.authKey.findOne(auth_key);

    if (!found) {
      return { canActivate: false, exception: new UnauthorizedException(`Specified auth key not found`) };
    }

    if (found.expires_at && found.expires_at > new Date()) {
      return { canActivate: false, exception: new UnauthorizedException(`Auth key expired`) };
    }

    return { canActivate: true };
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = await this.canActivateSilent(context);

    if (!result.canActivate) {
      throw result.exception;
    }

    return result.canActivate;
  }
}
