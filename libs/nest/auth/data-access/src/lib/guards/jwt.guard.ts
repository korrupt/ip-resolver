
import { ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

type CanActivateResult = { canActivate: true } | { canActivate: false; exception: HttpException };

@Injectable()
export class NestJwtGuard extends AuthGuard('jwt') {

  public async canActivateSilent(context: ExecutionContext): Promise<CanActivateResult> {
    try {
      await super.canActivate(context);
      return { canActivate: true };
    } catch (error) {
      return { canActivate: false, exception: error as HttpException }
    }
  }

}
