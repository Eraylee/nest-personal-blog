import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { Repository, DeleteResult } from 'typeorm';
import { BadRequestException } from '@nestjs/common/exceptions';

import { AuthService } from '../../common/auth/auth.service';
import { UserEntity } from './user.entity';
import { UserRO, UsersRO } from './user.interface';
import {
  CreateUserDto,
  QueryUserDto,
  LoginUserDto,
  UpdateUserDto,
} from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    protected readonly userRepository: Repository<UserEntity>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
  /**
   * 通过id查询用户
   * @param id
   */
  async findById(id: number): Promise<UserRO> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new BadRequestException(`id为${id}的用户不存在`);
    }
    return this.buildUserRO(user);
  }
  /**
   * 用户登录
   * @param dto
   */
  async login(dto: LoginUserDto): Promise<UserRO> {
    const findOptions = {
      username: dto.username,
      password: crypto.createHmac('sha256', dto.password).digest('hex'),
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
   * 查询
   * @param query
   */
  async find(query: QueryUserDto): Promise<UsersRO> {
    const qb = await this.userRepository.createQueryBuilder('user');
    let offset = 0;
    let limit = 10;
    let page = 1;
    qb.where('1 = 1');

    if (query.username) {
      qb.andWhere('user.name LIKE :username', { name: `%${query.username}%` });
    }
    if (query.nickname) {
      qb.andWhere('user.name LIKE :nickname', { name: `%${query.nickname}%` });
    }
    if (query.limit) {
      limit = query.limit;
    }
    if (query.page) {
      page = query.page;
      offset = limit * (page - 1);
    }
    qb.orderBy('user.createdAt', 'DESC');

    const total = await qb.getCount();

    qb.limit(limit)
      .offset(offset)
      .select('user.id')
      .addSelect('user.role')
      .addSelect('user.username')
      .addSelect('user.nickname')
      .addSelect('user.createdAt')
      .addSelect('user.updatedAt');
    const data = await qb.getMany();
    return { data, total, page };
  }
  /**
   * 创建用户
   * @param dto
   */
  async create(dto: CreateUserDto): Promise<UserRO> {
    const { username, password, nickname } = dto;
    const user = await this.userRepository.findOne({ username });

    if (user) {
      throw new BadRequestException('此用户已存在');
    }

    const newUser = new UserEntity();
    newUser.username = username;
    newUser.password = password;
    newUser.nickname = nickname;

    const savedUser = await this.userRepository.save(newUser);
    return this.buildUserRO(savedUser);
  }

  /**
   * 删除
   * @param id
   */
  async delete(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete({ id });
  }
  /**
   * 修改用户
   * @param dto
   */
  async update(id: number, dto: UpdateUserDto): Promise<UserRO> {
    const toUpdate: UserEntity = await this.userRepository.findOne(id);
    if (!toUpdate) {
      throw new BadRequestException(`id为${id}的用户不存在`);
    }
    if (dto.nickname) {
      toUpdate.nickname = dto.nickname;
    }
    if (dto.password) {
      toUpdate.password = crypto
        .createHmac('sha256', dto.password)
        .digest('hex');
    }
    if (dto.role) {
      toUpdate.role = dto.role;
    }
    const savedUser = await this.userRepository.save(toUpdate);
    return this.buildUserRO(savedUser);
  }
  /**
   * 构建UserRO
   * @param user
   */
  private buildUserRO(user: UserEntity) {
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
}
