/*
 * @Author: ERAYLEE
 * @Date: 2020-01-16 17:22:25
 * @LastEditors: ERAYLEE
 * @LastEditTime: 2020-04-16 14:11:14
 */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    return this.validateRole(request.user, context);
  }
  async validateRole(user, context) {
    const roles: string[] = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!roles) {
      return true;
    }
    const hasRole = () => !!roles.find(item => item === user.role);
    return user && user.role && hasRole();
  }
}
