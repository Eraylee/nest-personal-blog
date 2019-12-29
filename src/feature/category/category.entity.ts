/*
 * @Author: ERAYLEE
 * @Date: 2019-09-29 22:00:48
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2019-12-29 18:32:05
 */
import { Entity, Column, OneToMany } from 'typeorm';
import { ArticleEntity } from '../article/article.entity';
import { BaseEntity } from '../../common/base/base.entity';

@Entity('category')
export class CategoryEntity extends BaseEntity {
  @Column({
    length: 32,
  })
  name: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  enabled: boolean;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  parentId: string;

  @OneToMany(type => ArticleEntity, article => article.category)
  articles: ArticleEntity[];
}
