import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeRepository, DeleteResult } from 'typeorm';
import { BadRequestException } from '@nestjs/common/exceptions';

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
    return await this.articleRepository.findOne(id);
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
      .getMany();
    const data = await qb.getMany();
    return { data, total, page };
  }
  /**
   * 新增文章
   * @param user
   */
  async create(dto: CreateArticleDto, user: UserRO): Promise<ArticleEntity> {
    const article = new ArticleEntity();

    article.title = dto.title;
    article.description = dto.description;
    if (dto.isTop) {
      article.isTop = dto.isTop;
    }
    if (dto.isDraft) {
      article.isDraft = dto.isDraft;
    }
    if (dto.allowComment) {
      article.allowComment = dto.allowComment;
    }
    article.content = dto.content;
    article.user = await this.userRepository.findOne(user.id);
    if (dto.cover) {
      article.cover = dto.cover;
    }
    const attr = [];
    for (const name of dto.tags) {
      const record = await this.tagRepository.findOne({
        where: [name],
      });
      if (!record) {
        const tag = new TagEntity();
        tag.name = name;
        const rest: any = await this.tagRepository.save(
          this.tagRepository.create(tag),
        );
        attr.push(rest);
      } else {
        attr.push(await record);
      }
    }
    article.tags = attr;
    const category = await this.categoryRepository.findOne(dto.categoryId);
    if (!category) {
      throw new BadRequestException(`id为${dto.categoryId}的分类不存在`);
    }
    article.category = category;
    return await this.articleRepository.save(article);
  }
  /**
   * 修改文章
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
    article.content = dto.content;
    if (dto.cover) {
      article.cover = dto.cover;
    }

    const attr = [];
    for (const name of dto.tags) {
      const record = await this.tagRepository.findOne({
        where: [name],
      });
      if (!record) {
        const tag = new TagEntity();
        tag.name = name;
        const rest: any = await this.tagRepository.save(
          this.tagRepository.create(tag),
        );
        attr.push(rest);
      } else {
        attr.push(await record);
      }
    }
    article.tags = attr;

    const category = await this.categoryRepository.findOne(dto.categoryId);
    if (!category) {
      throw new BadRequestException(`id为${dto.categoryId}的分类不存在`);
    }
    article.category = category;

    return await this.articleRepository.save(article);
  }
  /**
   * 删除文章
   * @param user
   */
  async delete(id: number): Promise<DeleteResult> {
    const article = await this.articleRepository.findOne(id);
    if (!article) {
      throw new BadRequestException(`删除失败id为${id}的文章不存在`);
    }
    return await this.articleRepository.delete(id);
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
