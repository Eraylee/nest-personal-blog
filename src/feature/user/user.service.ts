import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as crypto from 'crypto';
import { Repository, DeleteResult } from 'typeorm';
import { BadRequestException } from '@nestjs/common/exceptions';
import { UserEntity } from './user.entity';
import { UserRO, UsersRO } from './user.interface';
import { serverConfig } from '../../config';
import {
  CreateUserDto,
  QueryUserDto,
  LoginUserDto,
  UpdateUserDto,
} from './dto/index.dto';
// tslint:disable-next-line: no-var-requires
const jwt = require('jsonwebtoken');
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    protected readonly userRepository: Repository<UserEntity | null>,
  ) {}
  /**
   * 通过id查询用户
   * @param id
   */
  async findById(id: number): Promise<UserRO> {
    const user = await this.userRepository.findOne(id);
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

    const token = await this.generateJWT(_user);
    const { username, nickname, id, createdAt, updatedAt } = _user;
    const user = {
      username,
      nickname,
      id,
      createdAt,
      updatedAt,
      token,
    };
    return { user };
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

    if ('username' in query) {
      qb.andWhere('role.name LIKE :username', { name: `%${query.username}%` });
    }
    if ('nickname' in query) {
      qb.andWhere('role.name LIKE :nickname', { name: `%${query.nickname}%` });
    }
    if ('limit' in query) {
      limit = query.limit;
    }
    if ('page' in query) {
      page = query.page;
      offset = limit * (page - 1);
    }
    qb.orderBy('user.createdAt', 'DESC');

    const total = await qb.getCount();

    qb.limit(limit)
      .offset(offset)
      .select('user.id')
      .addSelect('user.username')
      .addSelect('user.nickname')
      .addSelect('user.createdAt')
      .addSelect('user.updatedAt');
    const users = await qb.getMany();
    return { users, total, page };
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
  async modifyInfo(dto: UpdateUserDto): Promise<UserRO> {
    const toUpdate = await this.userRepository.findOne(dto.id);
    if (!toUpdate) {
      throw new BadRequestException('用户不存在');
    }
    const updated = Object.assign(toUpdate, dto);
    const savedUser = await this.userRepository.save(updated);
    return this.buildUserRO(savedUser);
  }

  /**
   *  生成token
   * @param user
   */
  public generateJWT(user) {
    const today = new Date();
    const exp = new Date(today);

    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        id: user.id,
        username: user.username,
        nickname: user.nickname,
        role: user.role,
        exp: exp.getTime() / 1000,
      },
      serverConfig.SECRET,
    );
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
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return { user: userRO };
  }
}
