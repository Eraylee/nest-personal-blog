/*
 * @Author: ERAYLEE
 * @Date: 2019-09-29 22:00:48
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2019-12-26 18:16:17
 */
import { Entity, Column, OneToMany } from 'typeorm';
import { ArticleEntity } from '../article/article.entity';
import { BaseEntity } from '../../common/base/base.entity';

@Entity('category')
export class CategoryEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  enabled: boolean;

  @Column('uuid')
  parentId: string;

  @OneToMany(type => ArticleEntity, article => article.category)
  articles: ArticleEntity[];
}
