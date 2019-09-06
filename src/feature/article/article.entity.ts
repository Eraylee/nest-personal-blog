import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { Category } from '../category/category.entity';
import { TagEntity } from '../tag/tag.entity';

@Entity('article')
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  isTop: boolean;

  @Column('text')
  content: string;

  @Column()
  allowComment: boolean;

  @Column()
  isDeleted: boolean;

  @Column()
  isDraft: boolean;

  @Column()
  isOriginal: boolean;

  @Column()
  cover: string;

  @Column('int')
  likeNum: number;

  @Column('int')
  viewsNum: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(type => UserEntity, user => user.articles)
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(type => Category, category => category.articles, {
    cascade: true,
  })
  @JoinColumn()
  category: Category;

  @ManyToMany(type => TagEntity, tag => tag.articles)
  @JoinTable()
  tags: TagEntity[];
}
