/*
 * @Author: ERAYLEE
 * @Date: 2019-10-01 01:14:08
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2020-02-01 12:34:31
 */
import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { ArticleEntity } from '../article/article.entity';
import { BaseEntity } from '../../common/base/base.entity';

@Entity('comment')
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

  @Column({
    length: 64,
    nullable: true,
  })
  parentId: string;

  @ManyToOne(type => ArticleEntity, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn()
  article: ArticleEntity;
}
