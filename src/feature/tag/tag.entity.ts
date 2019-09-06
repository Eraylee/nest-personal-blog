import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { ArticleEntity } from '../article/article.entity';

@Entity('tag')
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(type => ArticleEntity, article => article.tags)
  articles: ArticleEntity[];
}
