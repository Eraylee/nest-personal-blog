import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard extends PassportAuthGuard('jwt') {
  public canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  public handleRequest(err, user, info, context) {
    if (err || !user) {
      throw err || new UnauthorizedException('未鉴权，请重新登录');
    }
    return user;
  }
}
