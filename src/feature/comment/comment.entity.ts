/*
 * @Author: ERAYLEE
 * @Date: 2019-10-01 01:14:08
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2019-12-29 18:31:44
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
  @Column({
    length: 32,
  })
  authorName: string;

  @Column({
    length: 60,
  })
  authorMail: string;

  @Column({
    length: 100,
    nullable: true,
  })
  authorUrl: string;

  @Column({ length: 60, nullable: true })
  authorIp: string;

  @Column({ length: 60, nullable: true })
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
