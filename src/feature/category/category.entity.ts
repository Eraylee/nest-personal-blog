/*
 * @Author: ERAYLEE
 * @Date: 2019-09-29 22:00:48
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2019-12-20 09:28:41
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

  @Column('int')
  parentId: number;

  @OneToMany(type => ArticleEntity, article => article.category)
  articles: ArticleEntity[];
}
