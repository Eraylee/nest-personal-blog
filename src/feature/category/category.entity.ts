/*
 * @Author: ERAYLEE
 * @Date: 2019-09-29 22:00:48
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2019-12-19 18:02:49
 */
import {
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ArticleEntity } from '../article/article.entity';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  enabled: boolean;

  @ManyToOne(type => CategoryEntity, category => category.children)
  parent: CategoryEntity;

  @OneToMany(type => CategoryEntity, category => category.parent)
  children: CategoryEntity[];

  @OneToMany(type => ArticleEntity, article => article.category)
  articles: ArticleEntity[];
}
