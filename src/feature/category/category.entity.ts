import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ArticleEntity } from '../article/article.entity';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  enabled: boolean;

  @ManyToOne(type => Category, category => category.children)
  parent: Category;

  @OneToMany(type => Category, category => category.parent)
  children: Category[];

  @OneToMany(type => ArticleEntity, article => article.category)
  articles: ArticleEntity[];
}
