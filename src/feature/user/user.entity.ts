/*
 * @Author: ERAYLEE
 * @Date: 2019-09-06 21:06:33
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2020-01-27 14:02:21
 */
import { Entity, Column, BeforeInsert, OneToMany } from 'typeorm';
import * as crypto from 'crypto';
import { ArticleEntity } from '../article/article.entity';
import { BaseEntity } from '../../common/base/base.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ unique: true, length: 32 })
  username: string;

  @Column({ length: 32 })
  nickname: string;

  @Column({ length: 64, select: false })
  password: string;

  @Column({
    length: 20,
    default: 'regular',
  })
  role: string;

  @BeforeInsert()
  hashPassword() {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }

  @OneToMany(type => ArticleEntity, article => article.user)
  articles: ArticleEntity[];
}
