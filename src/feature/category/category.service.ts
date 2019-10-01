import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository, DeleteResult } from 'typeorm';
import { BadRequestException } from '@nestjs/common/exceptions';

import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { CategoryEntity } from './category.entity';
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryEntity: TreeRepository<CategoryEntity>,
  ) {}
  /**
   * 通过id查询分类
   * @param id
   */
  async findById(id: number): Promise<any> {
    return await this.categoryEntity.findOne(id);
  }
  /**
   * 查询分类树
   * @param query
   */
  async findTree(): Promise<CategoryEntity[]> {
    return await this.categoryEntity.findTrees();
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
      const parent = await this.categoryEntity.findOne(dto.parentId);
      if (!parent) {
        throw new BadRequestException(`id为${dto.parentId}的分类不存在`);
      }
      category.parent = parent;
    }
    return await this.categoryEntity.save(category);
  }
  /**
   * 修改分类
   * @param dto
   */
  async update(id: number, dto: UpdateCategoryDto): Promise<CategoryEntity> {
    const category = await this.categoryEntity.findOne(id);
    if (!category) {
      throw new BadRequestException(`id为${id}的分类不存在`);
    }
    if (dto.name) {
      category.name = dto.name;
    }
    if (dto.enabled) {
      category.enabled = dto.enabled;
    }
    if (dto.parentId) {
      const parent = await this.categoryEntity.findOne(dto.parentId);
      if (!parent) {
        throw new BadRequestException(`id为${dto.parentId}的分类不存在`);
      }
      category.parent = parent;
    }
    return this.categoryEntity.save(category);
  }
  /**
   * 删除分类
   * @param user
   */
  async delete(id: number): Promise<DeleteResult> {
    const category = await this.categoryEntity.findOne(id);
    if (!category) {
      throw new BadRequestException(`id为${id}的分类不存在`);
    }
    return await this.categoryEntity.delete(id);
  }
}
