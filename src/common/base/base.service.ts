/*
 * @Author: ERAYLEE
 * @Date: 2019-12-25 21:38:39
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2019-12-26 16:31:38
 */
import { NotFoundException, BadGatewayException } from '@nestjs/common';
import { DeleteResult, Repository, ObjectLiteral } from 'typeorm';
import { PaginationDto } from './base.dto';
import { PaginationResult } from '../interfaces';
export abstract class BaseService<T> {
  protected constructor(protected readonly repo: Repository<T>) {}
  /**
   * 查询单条数据
   * @param id
   */
  public async getOne(id: string): Promise<T> {
    const res = this.repo.findOne(id);
    if (!res) {
      throw new NotFoundException('当前资源不存在');
    }
    return res;
  }
  /**
   * 分页查询
   * @param query
   */
  public async getMany<D extends PaginationDto>(
    query: D,
  ): Promise<PaginationResult<T>> {
    const qb = await this.repo.createQueryBuilder(this.repo.metadata.name);
    let offset = 0;
    let limit = 10;
    let page = 1;

    if (query.limit) {
      limit = query.limit;
    }
    if (query.page) {
      page = query.page;
      offset = limit * (page - 1);
    }
    qb.orderBy(this.repo.metadata.name + '.createdAt', query.sort || 'DESC');

    const total = await qb.getCount();

    qb.limit(limit).offset(offset);
    const data = await qb.getMany();

    return { data, total, page };
  }
  /**
   * 创建
   * @param dto
   */
  public async create<D>(dto: D): Promise<T> {
    return await this.repo.save(this.repo.create(dto));
  }
  /**
   * 修改
   * @param id
   * @param dto
   */
  public async update<D>(id: string, dto: D): Promise<T> {
    const res = await this.getOne(id);
    Object.assign(res, dto);
    return await this.repo.save(res);
  }
  /**
   * 删除
   * @param ids
   */
  public async delete(ids: string[]): Promise<DeleteResult> {
    return this.repo.delete(ids);
  }
}
