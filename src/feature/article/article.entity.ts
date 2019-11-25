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
import { CategoryEntity } from '../category/category.entity';
import { TagEntity } from '../tag/tag.entity';

@Entity('article')
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isTop: boolean;

  @Column('text')
  markdown: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  allowComment: boolean;

  @Column('text')
  html: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isDeleted: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  isDraft: boolean;

  @Column({
    nullable: true,
  })
  cover: string;

  @Column({
    type: 'int',
    default: 0,
  })
  likeNum: number;

  @Column({
    type: 'int',
    default: 0,
  })
  viewsNum: number;

  @Column({
    type: 'int',
    default: 0,
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(type => UserEntity, user => user.articles)
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(type => CategoryEntity, category => category)
  @JoinColumn()
  category: CategoryEntity;

  @ManyToMany(type => TagEntity, tag => tag.articles)
  @JoinTable()
  tags: TagEntity[];
}
