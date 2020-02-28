import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeRepository, DeleteResult } from 'typeorm';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';

import { TagEntity } from '../tag/tag.entity';
import { ArticleEntity } from './article.entity';
import { UserEntity } from '../user/user.entity';
import { UserRO } from '../user/user.interface';
import { FileEntity } from '../file/file.entity';
import { CategoryEntity } from '../category/category.entity';
import { BaseService } from '../../common/base';
import { CreateArticleDto, QueryArticlesDto, QueryArticleDto } from './dto';

@Injectable()
export class ArticleService extends BaseService<ArticleEntity> {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,

    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,

    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {
    super(articleRepository);
  }

  /**
   * 查询
   * @param query
   */
  async findPage(query: QueryArticlesDto) {
    const qb = await this.articleRepository.createQueryBuilder('article');
    let skip = 0;
    let take = 10;
    let page = 1;

    if (query.limit) {
      take = query.limit;
    }
    if (query.page) {
      page = query.page;
      skip = take * (page - 1);
    }
    const total = await qb.getCount();

    qb.limit(take)
      .offset(skip)
      .orderBy('article.createdAt', 'DESC')
      .leftJoinAndSelect('article.tags', 'tag')
      .leftJoinAndSelect('article.category', 'category')
      .leftJoinAndSelect('article.user', 'user')
      .leftJoinAndSelect('article.cover', 'cover');

    if (query.title) {
      qb.andWhere('article.title LIKE :title', { title: query.title });
    }
    if (query.categoryId) {
      qb.andWhere('category.id = :id', { id: query.categoryId });
    }
    if (query.type) {
      qb.andWhere('article.type = :type', { type: query.type });
    }
    if (query.html) {
      qb.andWhere('article.description LIKE :html', {
        description: query.html,
      });
    }
    if (query.description) {
      qb.andWhere('article.description LIKE :description', {
        description: query.description,
      });
    }
    const data = await qb.getMany();
    return {
      data,
      total,
      page,
      limit: take,
      maxPage: Math.ceil(total / take),
    };
  }

  /**
   * 查询单条数据
   * @param id
   */
  public async getOne(id: string) {
    const article = await this.articleRepository.findOne(id);
    if (!article) {
      throw new NotFoundException('当前资源不存在');
    }
    ++ article.meta.views
    return this.articleRepository.save( article);
  }
  /**
   * 新增文章
   * @param dto
   * @param user
   */
  async createArticle(
    dto: CreateArticleDto,
    user: UserRO,
  ): Promise<ArticleEntity> {
    const article = new ArticleEntity();
    article.title = dto.title;
    if (dto.description) {
      article.description = dto.description;
    }
    if ('isTop' in dto) {
      article.isTop = dto.isTop;
    }
    if ('isDraft' in dto) {
      article.isDraft = dto.isDraft;
    }
    if ('allowComment' in dto) {
      article.allowComment = dto.allowComment;
    }
    if (dto.coverId) {
      const cover = await this.fileRepository.findOne(dto.coverId);
      if (!cover) {
        if (!cover) {
          throw new BadRequestException(`id${dto.categoryId}的文件不存在`);
        }
      }
      article.cover = cover;
    }
    article.markdown = dto.markdown;
    article.html = dto.html;
    article.user = await this.userRepository.findOne(user.id);
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
    if (dto.categoryId) {
      const category = await this.categoryRepository.findOne(dto.categoryId);
      if (!category) {
        throw new BadRequestException(`code为${dto.categoryId}的分类不存在`);
      }
      article.category = category;
    }
    if (dto.type) {
      article.type = dto.type;
    }
    return await this.articleRepository.save(article);
  }
  /**
   * 修改文章
   * @param id
   * @param dto
   */
  async update(id, dto) {
    const article = await this.articleRepository.findOne(id);
    if (!article) {
      throw new BadRequestException(`id${id}的文章不存在`);
    }
    article.title = dto.title;
    if (dto.description) {
      article.description = dto.description;
    }
    if ('isTop' in dto) {
      article.isTop = dto.isTop;
    }
    if ('isDraft' in dto) {
      article.isDraft = dto.isDraft;
    }
    if ('allowComment' in dto) {
      article.allowComment = dto.allowComment;
    }
    if (dto.type) {
      article.type = dto.type;
    }
    if (dto.coverId) {
      const cover = await this.fileRepository.findOne(dto.coverId);
      if (!cover) {
        if (!cover) {
          throw new BadRequestException(`id${dto.categoryId}的文件不存在`);
        }
      }
      article.cover = cover;
    }
    article.markdown = dto.markdown;
    article.html = dto.html;
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
    if (dto.categoryId) {
      const category = await this.categoryRepository.findOne(dto.categoryId);
      if (!category) {
        throw new BadRequestException(`code为${dto.categoryId}的分类不存在`);
      }
      article.category = category;
    }
    return await this.articleRepository.save(article);
  }
  /**
   * 查询单个文章
   * @param query
   */
  async queryOne(query: QueryArticleDto) {
    const qb = await this.articleRepository.createQueryBuilder('article');
    qb.leftJoinAndSelect('article.tags', 'tag')
      .leftJoinAndSelect('article.category', 'category')
      .leftJoinAndSelect('article.user', 'user')
      .leftJoinAndSelect('article.cover', 'cover');
    if (query.id) {
      qb.andWhere('article.id = :id', { id: query.id });
    }
    if (query.title) {
      qb.andWhere('article.title LIKE :title', { title: query.title });
    }
    if (query.categoryId) {
      qb.andWhere('category.id = :id', { id: query.categoryId });
    }
    if (query.type) {
      qb.andWhere('article.type = :type', { type: query.type });
    }
    if (query.html) {
      qb.andWhere('article.description LIKE :html', {
        description: query.html,
      });
    }
    if (query.description) {
      qb.andWhere('article.description LIKE :description', {
        description: query.description,
      });
    }
    const article = await qb.getOne();
    ++article.meta.views;
    console.log(article)
    return this.articleRepository.save(article);
  }
}
