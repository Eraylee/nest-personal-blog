/*
 * @Author: ERAYLEE
 * @Date: 2019-09-29 22:00:48
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2019-12-20 11:32:43
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
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}
  /**
   * 通过id查询分类
   * @param id
   */
  async findById(id: number): Promise<any> {
    const category = await this.categoryRepository.findOne(id);
    if (!category) {
      throw new NotFoundException('分类不存在');
    }
    return category;
  }
  /**
   *  通过id查询子分类
   * @param id
   */
  async findByPId(parentId: number): Promise<any> {
    const categorys = await this.categoryRepository.find({ parentId });
    return categorys;
  }
  /**
   * 查询全部分类
   * @param query
   */
  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find();
  }
  /**
   * 新增分类
   * @param user
   */
  async create(dto: CreateCategoryDto): Promise<CategoryEntity> {
    const category = new CategoryEntity();

    category.name = dto.name;
    category.enabled = dto.enabled;

    if (dto.parentId) {
      const parent = await this.categoryRepository.findOne(dto.parentId);
      if (!parent) {
        throw new BadRequestException(`id${dto.parentId}的分类不存在`);
      }
      if (parent.parentId) {
        throw new BadRequestException(`分类不得超过第二层级`);
      }
      category.parentId = parent.id;
    }
    return await this.categoryRepository.save(category);
  }
  /**
   * 修改分类
   * @param dto
   */
  async update(id: number, dto: UpdateCategoryDto): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne(id);
    if (!category) {
      throw new BadRequestException(`id为${id}的分类不存在`);
    }

    if ('name' in dto) {
      category.name = dto.name;
    }

    if ('enabled' in dto) {
      category.enabled = dto.enabled;
    }
    if (dto.parentId) {
      const parent = await this.categoryRepository.findOne(dto.parentId);
      if (!parent) {
        throw new BadRequestException(`id${dto.parentId}的分类不存在`);
      }
      if (parent.parentId) {
        throw new BadRequestException(`分类不得超过第二层级`);
      }
      category.parentId = parent.id;
    }
    return this.categoryRepository.save(category);
  }
  /**
   * 删除分类
   * @param user
   */
  async delete(id: number): Promise<DeleteResult> {
    const category = await this.categoryRepository.findOne(id);
    if (!category) {
      throw new BadRequestException(`id为${id}的分类不存在`);
    }
    return await this.categoryRepository.delete(id);
  }
}
