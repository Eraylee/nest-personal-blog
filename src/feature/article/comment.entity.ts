import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ArticleEntity } from './article.entity';

@Entity('comment')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  authorName: string;

  @Column()
  authorMail: string;

  @Column()
  authorUrl: boolean;

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

  @ManyToOne(type => CommentEntity, comment => comment.children)
  parent: CommentEntity;

  @OneToMany(type => CommentEntity, comment => comment.parent)
  children: CommentEntity[];

  @ManyToOne(type => ArticleEntity)
  @JoinColumn()
  article: ArticleEntity;
}
