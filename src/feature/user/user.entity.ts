/*
 * @Author: ERAYLEE
 * @Date: 2019-09-06 21:06:33
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2019-12-26 18:13:25
 */
import {
  Entity,
  Column,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import * as crypto from 'crypto';
import { ArticleEntity } from '../article/article.entity';
import { BaseEntity } from '../../common/base/base.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @Column({
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
