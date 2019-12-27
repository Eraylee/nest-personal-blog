/*
 * @Author: ERAYLEE
 * @Date: 2019-10-01 01:14:08
 * @LastEditors: ERAYLEE
 * @LastEditTime: 2019-12-26 18:13:59
 */
import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  Tree,
  TreeParent,
  TreeChildren,
} from 'typeorm';
import { ArticleEntity } from '../article/article.entity';
import { BaseEntity } from '../../common/base/base.entity';

@Entity('comment')
@Tree('materialized-path')
export class CommentEntity extends BaseEntity {
  @Column()
  authorName: string;

  @Column()
  authorMail: string;

  @Column()
  authorUrl: string;

  @Column()
  authorIp: string;

  @Column()
  authorAgent: string;

  @Column('text')
  content: string;

  @TreeChildren()
  children: CommentEntity[];

  @TreeParent()
  parent: CommentEntity;

  @ManyToOne(type => ArticleEntity)
  @JoinColumn()
  article: ArticleEntity;
}
