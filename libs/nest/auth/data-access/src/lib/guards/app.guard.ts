import { CanActivate, ExecutionContext, HttpException, Injectable } from "@nestjs/common";
import { NestJwtGuard } from "./jwt.guard";
import { NestAuthKeyGuard } from "./auth-key.guard";

type CanActivateResult = { canActivate: true } | { canActivate: false; exception: HttpException };


@Injectable()
export class NestAppGuard implements CanActivate {

  constructor(
    private jwtGuard: NestJwtGuard,
    private authKeyGuard: NestAuthKeyGuard,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const [jwtResult, authKeyResult] = await Promise.all<CanActivateResult>([
      this.jwtGuard.canActivateSilent(context),
      this.authKeyGuard.canActivateSilent(context)
    ]);


    // if one of them succeeds, continue
    if (jwtResult.canActivate || authKeyResult.canActivate) return true;

    if (!jwtResult.canActivate) {
      throw jwtResult.exception;
    }

    if (!authKeyResult.canActivate) {
      throw authKeyResult.exception;
    }

    return true;
  }
}
