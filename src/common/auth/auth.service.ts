import { Injectable, Inject } from '@nestjs/common';

import { UserRO } from '../../feature/user/user.interface';
import { UserService } from '../../feature/user/user.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  async validateUser(payload: JwtPayload): Promise<UserRO> {
    return await this.userService.findById(payload.id);
  }
}
