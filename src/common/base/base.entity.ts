/*
 * @Author: ERAYLEE
 * @Date: 2019-12-26 16:00:53
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2019-12-26 18:19:20
 */
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
