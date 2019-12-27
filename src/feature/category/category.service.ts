/*
 * @Author: ERAYLEE
 * @Date: 2019-09-29 22:00:48
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2019-12-27 13:35:42
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';

import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { CategoryEntity } from './category.entity';
import { BaseService } from '../../common/base';

@Injectable()
export class CategoryService extends BaseService<CategoryEntity> {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly repository: Repository<CategoryEntity>,
  ) {
    super(repository);
  }
  /**
   *  通过id查询子分类
   * @param id
   */
  async findByPId(parentId: string): Promise<any> {
    const categorys = await this.repository.find({ parentId });
    return categorys;
  }
  /**
   * 查询全部分类
   * @param query
   */
  async findAll(): Promise<CategoryEntity[]> {
    return await this.repository.find();
  }
}
