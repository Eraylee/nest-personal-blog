import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as _ from 'loadsh';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorOption: any = exception.getResponse();
    const errorInfo = errorOption.error;
    let errMessage = errorOption.message;
    if (_.isObject(errMessage)) {
      errMessage = errMessage[0].constraints;
    }
    const json = {
      code: status,
      error: errorInfo,
      timestamp: +new Date(),
      message: errMessage,
    };
    this.logger.error(`ERR ${request.url}`);
    this.logger.error(json);
    response.status(status).json(json);
  }
}
