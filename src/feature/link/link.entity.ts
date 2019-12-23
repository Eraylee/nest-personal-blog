/*
 * @Author: ERAYLEE
 * @Date: 2019-12-22 22:25:46
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2019-12-23 08:51:50
 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('link')
export class LinkEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  owner: string;

  @Column()
  url: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
