import {
  Entity,
  Tree,
  PrimaryGeneratedColumn,
  Column,
  TreeParent,
  TreeChildren,
  OneToMany,
} from 'typeorm';
import { ArticleEntity } from '../article/article.entity';

@Entity('category')
@Tree('materialized-path')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  enabled: boolean;

  @TreeChildren()
  children: CategoryEntity[];

  @TreeParent()
  parent: CategoryEntity;

  @OneToMany(type => ArticleEntity, article => article.category)
  articles: ArticleEntity[];
}
