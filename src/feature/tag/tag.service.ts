import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { BadRequestException } from '@nestjs/common/exceptions';

import { QueryTagDto, UpdateTagDto, CreateTagDto } from './dto';
import { TagEntity } from './tag.entity';
import { TagsRO } from './tag.interface';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagEntity: Repository<TagEntity>,
  ) {}
  /**
   * 通过id查询标签
   * @param id
   */
  async findById(id: number): Promise<any> {
    return await this.tagEntity.findOne(id);
  }
  /**
   * 新增标签
   * @param user
   */
  async create(dto: CreateTagDto): Promise<TagEntity> {
    return await this.tagEntity.save(dto);
  }
  /**
   * 查询
   * @param query
   */
  async find(query: QueryTagDto): Promise<TagsRO> {
    const qb = await this.tagEntity.createQueryBuilder('tab');
    let offset = 0;
    let limit = 10;
    let page = 1;
    qb.where('1 = 1');

    if ('name' in query) {
      qb.andWhere('tab.name LIKE :name', { name: `%${query.name}%` });
    }
    if ('limit' in query) {
      limit = query.limit;
    }
    if ('page' in query) {
      page = query.page;
      offset = limit * (page - 1);
    }

    const total = await qb.getCount();

    qb.limit(limit)
      .offset(offset)
      .select('tab.id')
      .addSelect('tab.name')
      .addSelect('tab.color');
    const data = await qb.getMany();
    return { data, total, page };
  }
  /**
   * 修改标签
   * @param dto
   */
  async update(id: number, dto: UpdateTagDto): Promise<TagEntity> {
    const tag = await this.tagEntity.findOne(id);
    if (!tag) {
      throw new BadRequestException(`id为${id}的标签不存在`);
    }
    tag.name = dto.name;
    return this.tagEntity.save(tag);
  }
  /**
   * 删除标签
   * @param user
   */
  async delete(id: number): Promise<DeleteResult> {
    const tag = await this.tagEntity.findOne(id);
    if (!tag) {
      throw new BadRequestException(`id为${id}的标签不存在`);
    }
    return await this.tagEntity.delete(id);
  }
}
