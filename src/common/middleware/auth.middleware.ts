import { UnauthorizedException } from '@nestjs/common/exceptions';
import { NestMiddleware, HttpStatus, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { serverConfig } from '../../config/index';
import { UserService } from '../../feature/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: any, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];
      const decoded: any = jwt.verify(token, serverConfig.SECRET);
      const user = await this.userService.findById(decoded.id);

      if (!user) {
        throw new UnauthorizedException('用户不存在');
      }
      req.user = decoded;
      next();
    } else {
      throw new UnauthorizedException('未授权');
    }
  }
}
