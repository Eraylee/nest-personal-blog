/*
 * @Author: ERAYLEE
 * @Date: 2020-01-16 17:22:25
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2020-02-08 11:16:04
 */
/*
 * @Author: ERAYLEE
 * @Date: 2020-01-16 17:22:25
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2020-02-05 19:53:32
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as readline from 'readline';
import * as path from 'path';
import { BadRequestException } from '@nestjs/common/exceptions';

import { ArticleEntity } from '../article/article.entity';
import { CommentEntity } from './comment.entity';
import {
  CreateCommentDto,
  UpdateCommentDto,
  QueryCommentsByArticleIdDto,
} from './dto';
import { BaseService } from '../../common/base';
import { UAParser as parser } from 'ua-parser-js';
import Mint from 'mint-filter';

// tslint:disable-next-line: no-var-requires
// const parser = require('ua-parser-js');

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
  //   /**
  //  * 通过文章id查询评论
  //  * @param articleId
  //  */
  // async queryByArticleId(articleId: string) {
  //   const qb = await this.repository
  //     .createQueryBuilder('comment')
  //     .leftJoin('comment.article', 'article')
  //     .where('article.id = :id', { id: articleId })
  //     .getMany();
  //   return qb;
  // }
  /**
   * 通过文章id查询评论
   * @param articleId
   */
  async queryByArticleId(
    articleId: string,
    query: QueryCommentsByArticleIdDto,
  ) {
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

    const subQuery = await this.repository
      .createQueryBuilder('comment')
      .limit(take)
      .offset(skip)
      .orderBy('comment.createdAt', 'DESC')
      .leftJoin('comment.article', 'article')
      .where('comment.parentId is null')
      .andWhere('article.id = :id', { id: articleId });

    const parents = await subQuery.getMany();
    const children = await this.repository
      .createQueryBuilder('comment')
      .where(
        'comment.parentId IN (' +
          subQuery.select('comment.id').getQuery() +
          ')',
      )
      .setParameters(subQuery.select('comment.id').getParameters())
      .getMany();

    const total = await subQuery.getCount();
    return {
      data: [...parents, ...children],
      total,
      page,
      limit: take,
      maxPage: Math.ceil(total / take),
    };
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
    ++article.meta.comments;
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
    if ('authorUrl' in dto) {
      comment.authorUrl = dto.authorUrl;
    }
    const words = await this.getWords();
    const mint = new Mint([...words]);

    comment.content = mint.filterSync(dto.content).text as string;
    const ua = parser(agent);
    const os = `${ua.os.name} ${ua.os.version}`;
    const browser = `${ua.browser.name} ${ua.browser.version}`;
    comment.authorAgent = `${os}/${browser}`;
    this.articleRepository.save(article);
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
  /**
   * 物理删除评论
   * @param ids
   */
  async delete(ids: string[]) {
    const deleteIds = await Promise.all(
      ids.map(async v => {
        const comment = await this.repository.findOne(v, {
          relations: ['article'],
        });
        if (!comment) {
          throw new BadRequestException(`找不到id为${v}的评论`);
        }
        const childrenNums = await this.repository.count({
          parentId: v,
        });
        if (childrenNums > 0) {
          throw new BadRequestException('此评论含有子评论，无法删除');
        }
        --comment.article.meta.comments;
        await this.articleRepository.save(comment.article);
        return v;
      }),
    );
    return await this.repository.delete(deleteIds);
  }
  /**
   * 软删除
   * @param ids
   */
  async softDelete(ids: string[]) {
    ids.map(async v => {
      const comment = await this.repository.findOne(v);
      comment.isDelete = true;
      if (comment.content.match('回复@')) {
        const reply = comment.content.split('</a>:')[0];
        comment.content = `${reply}</a>: <p>此评论已经删除</p>`;
      }
      await this.repository.save(comment);
    });
  }

  private getWords = async (): Promise<Set<string>> => {
    return new Promise(resolve => {
      const map = new Set<string>();
      const _path = path.resolve(__dirname, '../../../keywords/teywords.txt');
      readline
        .createInterface({
          input: fs.createReadStream(_path, { encoding: 'UTF-8' }),
        })
        .on('line', line => {
          if (line) {
            line = line.replace(/,/g,'')
            map.add(line);
          }
        })
        .once('close', () => {
          resolve(map);
        });
    });
  };
}
