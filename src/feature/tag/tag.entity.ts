/*
 * @Author: ERAYLEE
 * @Date: 2019-09-30 21:40:20
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2019-12-29 18:29:07
 */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { ArticleEntity } from '../article/article.entity';
import { BaseEntity } from '../../common/base';

@Entity('tag')
export class TagEntity extends BaseEntity {
  @Column({
    length: 32,
  })
  name: string;

  @Column({
    length: 32,
    nullable: true,
  })
  color: string;

  @ManyToMany(type => ArticleEntity, article => article.tags)
  articles: ArticleEntity[];
}
