/*
 * @Author: ERAYLEE
 * @Date: 2019-12-22 22:25:46
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2019-12-23 13:55:04
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { BadRequestException } from '@nestjs/common/exceptions';

import { LinkEntity } from './link.entity';
import { LinkDto } from './dto/link.dto';
@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(LinkEntity)
    protected readonly linkRepository: Repository<LinkEntity>,
  ) {}
  /**
   * 通过id查找
   * @param id
   */
  async findById(id: number): Promise<LinkEntity> {
    const user = await this.linkRepository.findOne(id);
    if (!user) {
      throw new BadRequestException(`id为${id}的友链不存在`);
    }
    return user;
  }

  /**
   * 查询
   * @param query
   */
  async find(): Promise<LinkEntity[]> {
    return this.linkRepository.find();
  }
  /**
   * 创建链接
   * @param dto
   */
  async create(dto: LinkDto): Promise<LinkEntity> {
    const link = new LinkEntity();
    Object.assign(link, dto);
    return await this.linkRepository.save(link);
  }
  /**
   * 修改友链
   * @param id
   * @param dto
   */
  async update(id: number, dto: LinkDto): Promise<LinkEntity> {
    const link = await this.linkRepository.findOne(id);
    if (!link) {
      throw new BadRequestException(`id${id}的友链不存在`);
    }
    Object.assign(link, dto);
    return await this.linkRepository.save(link);
  }
  /**
   * 删除
   * @param ids
   */
  async remove(ids: number[]): Promise<DeleteResult> {
    return await this.linkRepository.delete(ids);
  }
}
