/*
 * @Author: ERAYLEE
 * @Date: 2019-10-01 01:14:08
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2020-02-06 22:11:44
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

  @Column({
    nullable: true,
  })
  isDelete: boolean;

  @Column({ length: 60, nullable: true })
  authorIp: string;

  @Column({ length: 60, nullable: true })
  authorAgent: string;

  @Column('text')
  content: string;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  parentId: string;

  @ManyToOne(type => ArticleEntity, type => type.comments, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn()
  article: ArticleEntity;
}
