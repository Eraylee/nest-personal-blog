/*
 * @Author: ERAYLEE
 * @Date: 2019-09-29 22:00:48
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2020-02-03 21:26:53
 */
import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  OneToOne,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { BaseEntity } from '../../common/base';
import { CategoryEntity } from '../category/category.entity';
import { FileEntity } from '../file/file.entity';
import { TagEntity } from '../tag/tag.entity';
import { CommentEntity } from '../comment/comment.entity';

@Entity('article')
export class ArticleEntity extends BaseEntity {
  @Column({ length: 80 })
  title: string;

  @Column({ length: 100, nullable: true })
  description: string;

  @Column({
    type: 'boolean',
    default: false,
    nullable: true,
  })
  isTop: boolean;

  @Column('text')
  markdown: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  allowComment: boolean;

  @Column('text')
  html: string;

  @Column({
    type: 'boolean',
    default: false,
    nullable: true,
  })
  isDeleted: boolean;

  @Column({
    type: 'boolean',
    default: false,
    nullable: true,
  })
  isDraft: boolean;

  @Column({
    type: 'int',
    default: 0,
  })
  likeNum: number;

  @Column({
    type: 'int',
    default: 0,
  })
  viewsNum: number;

  @Column({
    length: 60,
    default: 'normal',
  })
  type: string;

  @ManyToOne(type => UserEntity, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
    nullable: true,
  })
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(type => CategoryEntity, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
    nullable: true,
  })
  @JoinColumn()
  category: CategoryEntity;

  @OneToOne(type => FileEntity, {
    cascade: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    eager: true,
    nullable: true,
  })
  @JoinColumn()
  cover: FileEntity;

  @ManyToMany(type => TagEntity, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
    nullable: true,
  })
  @JoinTable()
  tags: TagEntity[];

  @OneToMany(type => CommentEntity, type => ArticleEntity)
  comment: CommentEntity[];
}
