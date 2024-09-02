import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthUser } from "../classes";

@Injectable()
export class AclGuard extends AuthGuard('jwt') {
  /* eslint-disable */
  // @ts-ignore
  handleRequest(err: any, user: any, info: any, context: ExecutionContext, status?: any) {
    return new AuthUser(user);
  }
  /* eslint-enable */
}
