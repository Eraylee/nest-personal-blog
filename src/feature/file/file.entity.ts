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

@Entity('file')
export class FileEntity {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column()
  public readonly path: string;

  @Column({
    type: 'int',
  })
  public readonly size: string;

  @Column()
  public readonly name: string;

  @Column()
  public readonly type: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
