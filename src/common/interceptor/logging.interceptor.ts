import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const url = req.url;
    return next.handle().pipe(
      tap(
        () => {
          new Logger(`RESTful:${context.getClass().name}`).log(
            `来源 ip:${req.ip} 请求方法:${method} 请求路径:${url} 处理成功`,
          );
        },
        () => {
          new Logger(`RESTful:${context.getClass().name}`).error(
            `来源 ip:${req.ip} 请求方法:${method} 请求路径:${url} 处理失败`,
          );
        },
      ),
    );
  }
}
