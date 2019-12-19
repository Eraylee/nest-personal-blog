import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeRepository, DeleteResult } from 'typeorm';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';

import { ArticlesRO } from './article.interface';
import { TagEntity } from '../tag/tag.entity';
import { ArticleEntity } from './article.entity';
import { UserEntity } from '../user/user.entity';
import { UserRO } from '../user/user.interface';
import { CategoryEntity } from '../category/category.entity';
import { CreateArticleDto, UpdateArticleDto, QueryArticleDto } from './dto';
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,

    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(TagEntity)
    private readonly tagRepository: TreeRepository<TagEntity>,
  ) {}
  /**
   * 通过id查询文章
   * @param id
   */
  async findById(id: number): Promise<ArticleEntity> {
    const article = await this.articleRepository
      .createQueryBuilder('article')
      .where('article.id = :id', { id })
      .leftJoinAndSelect('article.tags', 'tag')
      .leftJoinAndSelect('article.category', 'category')
      .leftJoinAndSelect('article.user', 'user')
      .getOne();
    if (!article) {
      throw new NotFoundException('资源不存在');
    }
    return article;
  }
  /**
   * 查询
   * @param query
   */
  async find(query: QueryArticleDto): Promise<ArticlesRO> {
    const qb = await this.articleRepository.createQueryBuilder('article');
    let offset = 0;
    let limit = 10;
    let page = 1;
    qb.where('1 = 1');

    if (query.title) {
      qb.andWhere('article.title LIKE :title', { title: `%${query.title}%` });
    }
    if (query.limit) {
      limit = query.limit;
    }
    if (query.page) {
      page = query.page;
      offset = limit * (page - 1);
    }

    const total = await qb.getCount();

    qb.limit(limit)
      .offset(offset)
      .leftJoinAndSelect('article.tags', 'tag')
      .leftJoinAndSelect('article.category', 'category')
      .getMany();
    const data = await qb.getMany();
    return { data, total, page };
  }
  /**
   * 新增文章
   * @param dto
   * @param user
   */
  async create(dto: CreateArticleDto, user: UserRO): Promise<ArticleEntity> {
    const article = new ArticleEntity();

    article.title = dto.title;
    article.description = dto.description;
    if ('isTop' in dto) {
      article.isTop = dto.isTop;
    }
    if ('isDraft' in dto) {
      article.isDraft = dto.isDraft;
    }
    if ('allowComment' in dto) {
      article.allowComment = dto.allowComment;
    }
    article.markdown = dto.markdown;
    article.html = dto.html;
    article.user = await this.userRepository.findOne(user.id);
    if (dto.cover) {
      article.cover = dto.cover;
    }
    const attr = [];
    for (const item of dto.tags) {
      const tag = await this.tagRepository.findOne(item);
      if (!tag) {
        throw new BadRequestException(`id为${item}的标签不存在`);
      }
      attr.push(tag);
    }
    article.tags = attr;
    const category = await this.categoryRepository.findOne(dto.categoryId);
    if (!category) {
      throw new BadRequestException(`code为${dto.categoryId}的分类不存在`);
    }
    article.category = category;
    return await this.articleRepository.save(article);
  }
  /**
   * 修改文章
   * @param id
   * @param dto
   */
  async update(id: number, dto: UpdateArticleDto) {
    const article = await this.articleRepository.findOne(id);
    if (!article) {
      throw new BadRequestException(`id为${id}的文章不存在`);
    }
    article.title = dto.title;
    article.description = dto.description;
    article.isTop = dto.isTop;
    article.isDraft = dto.isDraft;
    article.allowComment = dto.allowComment;
    article.html = dto.html;
    article.markdown = dto.markdown;
    if (dto.cover) {
      article.cover = dto.cover;
    }
    // 如果有标签
    if (dto.tags) {
      const attr = [];
      for (const item of dto.tags) {
        const tag = await this.tagRepository.findOne(item);
        if (!tag) {
          throw new BadRequestException(`id为${item}的标签不存在`);
        }
        attr.push(tag);
      }
      article.tags = attr;
    }
    // 如果有分类
    if (dto.categoryId) {
      const category = await this.categoryRepository.findOne(dto.categoryId);
      if (!category) {
        throw new BadRequestException(`code为${dto.categoryId}的分类不存在`);
      }
    }

    return await this.articleRepository.save(article);
  }
  /**
   * 删除文章
   * @param ids
   */
  async remove(ids: number[]): Promise<DeleteResult> {
    return await this.articleRepository.delete(ids);
  }
  /**
   * 软删除
   * @param id
   */
  async softDelete(id: number) {
    const article = await this.articleRepository.findOne(id);
    if (!article) {
      throw new BadRequestException(`删除id为${id}的文章不存在`);
    }
    article.isDeleted = false;
    await this.articleRepository.save(article);
  }
}
