/*
 * @Author: ERAYLEE
 * @Date: 2019-09-30 21:40:20
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2019-12-27 12:49:26
 */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { ArticleEntity } from '../article/article.entity';
import { BaseEntity } from '../../common/base';

@Entity('tag')
export class TagEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  color: string;

  @ManyToMany(type => ArticleEntity, article => article.tags)
  articles: ArticleEntity[];
}
