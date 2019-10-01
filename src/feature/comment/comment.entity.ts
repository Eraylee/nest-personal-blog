import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  Tree,
  TreeParent,
  TreeChildren,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ArticleEntity } from '../article/article.entity';

@Entity('comment')
@Tree('materialized-path')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  authorName: string;

  @Column()
  authorMail: string;

  @Column()
  authorUrl: string;

  @Column()
  authorIp: string;

  @Column()
  authorAgent: string;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @TreeChildren()
  children: CommentEntity[];

  @TreeParent()
  parent: CommentEntity;

  @ManyToOne(type => ArticleEntity)
  @JoinColumn()
  article: ArticleEntity;
}
