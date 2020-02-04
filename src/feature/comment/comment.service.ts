/*
 * @Author: ERAYLEE
 * @Date: 2020-01-16 17:22:25
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2020-02-03 20:23:45
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common/exceptions';

import { ArticleEntity } from '../article/article.entity';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto, UpdateCommentDto } from './dto';
import { BaseService } from '../../common/base';
// tslint:disable-next-line: no-var-requires
const parser = require('ua-parser-js');

@Injectable()
export class CommentService extends BaseService<CommentEntity> {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly repository: Repository<CommentEntity>,
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {
    super(repository);
  }
  /**
   * 通过文章id查询评论
   * @param articleId
   */
  async queryByArticleId(articleId: string) {
    const qb = await this.repository
      .createQueryBuilder('comment')
      .leftJoin('comment.article', 'article')
      .where('article.id = :id', { id: articleId })
      .getMany();
    return qb;
  }
  /**
   * 创建评论
   * @param dto
   * @param ip
   * @param agent
   */
  async createComment(
    dto: CreateCommentDto,
    ip: string,
    agent: string,
  ): Promise<CommentEntity> {
    const comment = new CommentEntity();
    const article = await this.articleRepository.findOne(dto.articleId);
    if (!article) {
      throw new BadRequestException(`id为${dto.articleId}的文章不存在`);
    }
    comment.article = article;
    if ('parentId' in dto) {
      const parent = await this.repository.findOne(dto.parentId);
      if (!parent) {
        throw new BadRequestException(`id为${dto.parentId}的评论不存在`);
      }
      comment.parentId = dto.parentId;
    }
    comment.authorIp = ip;

    comment.authorMail = dto.authorMail;
    comment.authorName = dto.authorName;
    comment.content = dto.content;
    if ('authorUrl' in dto) {
      comment.authorUrl = dto.authorUrl;
    }
    const ua = parser(agent);
    const os = `${ua.os.name}.${ua.os.version}`;
    const browser = `${ua.browser.name}.${ua.browser.major}`;
    comment.authorAgent = `${os}/${browser}`;
    return await this.repository.save(comment);
  }
  /**
   * 修改评论
   * @param dto
   */
  async updateComment(
    id: string,
    dto: UpdateCommentDto,
  ): Promise<CommentEntity> {
    const comment = await this.repository.findOne(id);
    if (!comment) {
      throw new BadRequestException(`id为${id}的评论不存在`);
    }
    if ('authorUrl' in dto) {
      comment.authorUrl = dto.authorUrl;
    }
    comment.content = dto.content;
    return await this.repository.save(comment);
  }
}
