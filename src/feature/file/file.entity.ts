/*
 * @Author: ERAYLEE
 * @Date: 2019-11-17 15:08:07
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2020-01-01 13:50:43
 */
import { Entity, Column, OneToOne } from 'typeorm';
import { BaseEntity } from '../../common/base/base.entity';
import { ArticleEntity } from '../article/article.entity';

@Entity('file')
export class FileEntity extends BaseEntity {
  @Column()
  public path: string;

  @Column()
  public originalName: string;

  @Column()
  public fileName: string;

  @Column('int')
  public size: number;

  @Column()
  public fieldName: string;

  @Column()
  public mimeType: string;

  @OneToOne(type => ArticleEntity, article => article.cover)
  article: ArticleEntity;
}
