import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeRepository, DeleteResult, Tree } from 'typeorm';
import { BadRequestException } from '@nestjs/common/exceptions';

import { ArticleEntity } from '../article/article.entity';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto, UpdateCommentDto } from './dto';
import { BaseController } from '../../common/base';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: TreeRepository<CommentEntity>,

    @InjectRepository(CommentEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}
  /**
   * 查询评论树
   * @param id
   */
  async findTree(id: number): Promise<CommentEntity> {
    const comment = await this.commentRepository.findOne(id);
    if (!comment) {
      throw new BadRequestException(`id为${id}的评论不存在`);
    }
    return this.commentRepository.findDescendantsTree(comment);
  }
  /**
   * 查询评论
   * @param id
   */
  async findById(id: number): Promise<CommentEntity> {
    const comment = await this.commentRepository.findOne(id);
    if (!comment) {
      throw new BadRequestException(`id为${id}的评论不存在`);
    }
    return comment;
  }
  /**
   * 创建评论
   * @param dto
   * @param ip
   * @param agent
   */
  async create(
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
      const parent = await this.commentRepository.findOne(dto.parentId);
      if (!parent) {
        throw new BadRequestException(`id为${dto.parentId}的评论不存在`);
      }
      comment.parent = parent;
    }
    comment.authorIp = ip;
    comment.authorAgent = agent;
    comment.authorMail = dto.authorMail;
    comment.authorName = dto.authorName;
    if ('authorUrl' in dto) {
      comment.authorUrl = dto.authorUrl;
    }
    return await this.commentRepository.save(comment);
  }
  /**
   * 修改评论
   * @param dto
   */
  async update(id: number, dto: UpdateCommentDto): Promise<CommentEntity> {
    const comment = await this.commentRepository.findOne(id);
    if (!comment) {
      throw new BadRequestException(`id为${id}的评论不存在`);
    }
    if ('authorUrl' in dto) {
      comment.authorUrl = dto.authorUrl;
    }
    comment.content = dto.content;
    return await this.commentRepository.save(comment);
  }
  /**
   * 删除评论
   * @param ids
   */
  async remove(ids: number[]): Promise<DeleteResult> {
    return await this.commentRepository.delete(ids);
  }
}
