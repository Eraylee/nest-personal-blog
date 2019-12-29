/*
 * @Author: ERAYLEE
 * @Date: 2019-09-29 22:00:48
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2019-12-29 18:33:24
 */
import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { BaseEntity } from '../../common/base';
import { CategoryEntity } from '../category/category.entity';
import { TagEntity } from '../tag/tag.entity';

@Entity('article')
export class ArticleEntity extends BaseEntity {
  @Column({ length: 80 })
  title: string;

  @Column({ length: 100 })
  description: string;

  @Column({
    type: 'boolean',
    default: false,
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
  })
  isDeleted: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  isDraft: boolean;

  @Column()
  cover: string;

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

  @ManyToMany(type => TagEntity, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
    nullable: true,
  })
  @JoinTable()
  tags: TagEntity[];
}
