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
    private readonly categoryRepository: TreeRepository<CategoryEntity>,
  ) {}
  /**
   * 通过id查询分类
   * @param id
   */
  async findById(id: number): Promise<any> {
    const category = await this.categoryRepository.findOne(id);
    const ancestorsTree = await this.categoryRepository.findAncestorsTree(
      category,
    );
    if (ancestorsTree.parent) {
      Object.assign(ancestorsTree, { parent: ancestorsTree.parent.code });
    }
    return ancestorsTree;
  }
  /**
   * 查询分类树
   * @param query
   */
  async findTree(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.findTrees();
  }
  /**
   * 新增分类
   * @param user
   */
  async create(dto: CreateCategoryDto): Promise<CategoryEntity> {
    const category = new CategoryEntity();

    category.name = dto.name;
    category.code = dto.code;
    category.enabled = dto.enabled;

    if (dto.parent) {
      const parent = await this.categoryRepository.findOne({
        code: dto.parent,
      });
      if (!parent) {
        throw new BadRequestException(`code为${dto.parent}的分类不存在`);
      }
      category.parent = parent;
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
    if ('code' in dto) {
      category.code = dto.code;
    }
    if ('enabled' in dto) {
      category.enabled = dto.enabled;
    }
    if (dto.parent) {
      const parent = await this.categoryRepository.findOne({
        code: dto.parent,
      });
      if (!parent) {
        throw new BadRequestException(`code为${dto.parent}的分类不存在`);
      }
      category.parent = parent;
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
