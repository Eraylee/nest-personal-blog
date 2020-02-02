/*
 * @Author: ERAYLEE
 * @Date: 2019-09-29 22:00:48
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2020-02-01 12:11:32
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
  /**
   * 新增分类
   * @param dto
   */
  async create(dto) {
    if (dto.parentId) {
      const parent = await this.repository.findOne(dto.parentId);
      if (!parent) {
        throw new BadRequestException(
          `新增失败，找不到id为${dto.parentId}的父级分类`,
        );
      }
      if (parent.parentId) {
        throw new BadRequestException(`新增失败，分类无法超过两级`);
      }
    }
    const category = new CategoryEntity();
    Object.assign(category, dto);
    return await this.repository.save(category);
  }
  /**
   * 删除分类
   * @param id
   */
  async remove(id: string) {
    const children = await this.repository.find({ parentId: id });
    if (children.length) {
      throw new BadRequestException('当前分类含有下级，无法删除');
    }
    return await this.repository.delete(id);
  }
}
