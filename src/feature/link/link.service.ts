/*
 * @Author: ERAYLEE
 * @Date: 2019-12-22 22:25:46
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2020-01-12 21:13:28
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { BadRequestException } from '@nestjs/common/exceptions';
import { LinkEntity } from './link.entity';
import { FileEntity } from '../file/file.entity';
import { BaseService } from '../../common/base';
@Injectable()
export class LinkService extends BaseService<LinkEntity> {
  constructor(
    @InjectRepository(LinkEntity)
    protected readonly repository: Repository<LinkEntity>,
    @InjectRepository(FileEntity)
    protected readonly fileRepo: Repository<FileEntity>,
  ) {
    super(repository);
  }
  async create(dto) {
    const link = new LinkEntity();
    const avatar = await this.fileRepo.findOne(dto.avatarId);
    if (!avatar) {
      throw new BadRequestException(`id为${dto.avatarId}的文件不存在`);
    }
    link.avatar = avatar;
    link.owner = dto.owner;
    link.url = dto.url;
    link.description = dto.description;
    return await this.repository.save(link);
  }
  async update(id, dto) {
    const link = await this.repository.findOne(id);
    if (!link) {
      throw new BadRequestException(`id为${id}的友联不存在`);
    }
    const avatar = await this.fileRepo.findOne(dto.avatarId);
    if (!avatar) {
      throw new BadRequestException(`id为${dto.avatarId}的文件不存在`);
    }
    link.avatar = avatar;
    link.owner = dto.owner;
    link.url = dto.url;
    link.description = dto.description;
    return await this.repository.save(link);
  }
}
