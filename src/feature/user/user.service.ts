import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { Repository, DeleteResult } from 'typeorm';
import { ConfigService, InjectConfig } from 'nestjs-config';
import { BadRequestException } from '@nestjs/common/exceptions';

import { AuthService } from '../../common/auth/auth.service';
import { UserEntity } from './user.entity';
import { BaseService } from '../../common/base';
import { UserRO } from './user.interface';
import { LoginUserDto, UpdatePasswordDto, CreateUserDto } from './dto';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    protected readonly userRepository: Repository<UserEntity>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectConfig()
    private readonly config: ConfigService,
  ) {
    super(userRepository);
  }
  /**
   * 用户登录
   * @param dto
   */
  async login(dto: LoginUserDto): Promise<UserRO> {
    const findOptions = {
      username: dto.username,
      password: this.buildPassword(dto.password),
    };
    // tslint:disable-next-line: variable-name
    const _user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username: findOptions.username })
      .andWhere('user.password = :password', {
        password: findOptions.password,
      })
      .getOne();

    if (!_user) {
      throw new BadRequestException('用户名或者密码错误');
    }
    const { username, nickname, id, role, createdAt, updatedAt } = _user;
    const token = await this.authService.createToken({
      id,
      username,
      nickname,
      role,
    });
    const user = {
      username,
      nickname,
      id,
      role,
      createdAt,
      updatedAt,
      token,
    };
    return user;
  }
  /**
   * 修改密码
   * @param dto
   */
  async updatePassword(id: string, dto: UpdatePasswordDto): Promise<UserRO> {
    const findOptions = {
      id,
      password: this.buildPassword(dto.oldPassword),
    };
    // tslint:disable-next-line: variable-name
    const toUpdate = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { username: findOptions.id })
      .andWhere('user.password = :password', {
        password: findOptions.password,
      })
      .getOne();

    if (!toUpdate) {
      throw new BadRequestException('不存在此用户或原密码错误');
    }
    toUpdate.password = dto.newPassword;
    const savedUser = await this.userRepository.save(toUpdate);
    return this.buildUser(savedUser);
  }
  /**
   * 重置密码
   * @param dto
   */
  async resetPassword(id: string): Promise<UserRO> {
    const toUpdate: UserEntity = await this.userRepository.findOne(id);
    if (!toUpdate) {
      throw new BadRequestException(`id为${id}的用户不存在`);
    }
    toUpdate.password = this.buildPassword(
      this.config.get('service.DEFAULT_PASSWORD'),
    );
    const savedUser = await this.userRepository.save(toUpdate);
    return this.buildUser(savedUser);
  }
  /**
   * 构建UserRO
   * @param user
   */
  private buildUser(user: UserEntity) {
    const userRO = {
      id: user.id,
      username: user.username,
      nickname: user.nickname,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return userRO;
  }
  /**
   * 加密密码
   * @param password
   */
  private buildPassword(password: string): string {
    return crypto.createHmac('sha256', password).digest('hex');
  }

  createUser(dto: CreateUserDto) {
    try {
      const user = new UserEntity();
      Object.assign(user, dto, {
        password: this.config.get('service.DEFAULT_PASSWORD'),
      });
      return this.repo.save(user);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
