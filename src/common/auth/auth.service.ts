/*
 * @Author: ERAYLEE
 * @Date: 2019-09-29 21:55:23
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2019-12-26 22:06:00
 */
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UserService } from '../../feature/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {}
  async createToken(payload: JwtPayload): Promise<string> {
    return this.jwtService.sign(payload);
  }
  async validateUser(payload: JwtPayload) {
    return await this.userService.getOne(payload.id);
  }
}
