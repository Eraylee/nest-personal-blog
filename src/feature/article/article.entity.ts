/*
 * @Author: ERAYLEE
 * @Date: 2019-09-29 22:00:48
 * @LastEditors: ERAYLEE
 * @LastEditTime: 2020-02-28 10:59:25
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
    length: 60,
    default: 'normal',
  })
  type: string;

  @ManyToOne(type => UserEntity, type => type.articles, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
    nullable: true,
  })
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(type => CategoryEntity, type => type.articles, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
    nullable: true,
  })
  @JoinColumn()
  category: CategoryEntity;

  @OneToOne(type => FileEntity, type => type.article, {
    cascade: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    eager: true,
    nullable: true,
  })
  @JoinColumn()
  cover: FileEntity;

  @Column({
    type: 'json',
    default: {
      views: 0,
      comments: 0,
      likes: 0,
    },
    nullable: true,
  })
  public meta: {
    views: number;
    comments: number;
    likes: number;
  };

  @ManyToMany(type => TagEntity, type => type.articles, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
    nullable: true,
  })
  @JoinTable()
  tags: TagEntity[];

  @OneToMany(type => CommentEntity, type => type.article)
  comments: CommentEntity[];
}
