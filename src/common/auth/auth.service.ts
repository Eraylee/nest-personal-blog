import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserRO } from '../../feature/user/user.interface';
import { UserService } from '../../feature/user/user.service';
import { JwtPayload } from './jwt-payload.interface';

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
  async validateUser(payload: JwtPayload): Promise<UserRO> {
    return await this.userService.findById(payload.id);
  }
}
