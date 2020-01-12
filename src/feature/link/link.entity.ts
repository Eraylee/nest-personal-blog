/*
 * @Author: ERAYLEE
 * @Date: 2019-12-22 22:25:46
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2020-01-12 16:37:25
 */
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/base/base.entity';
import { FileEntity } from '../file/file.entity';

@Entity('link')
export class LinkEntity extends BaseEntity {
  @Column()
  owner: string;

  @Column()
  url: string;

  @OneToOne(type => FileEntity, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
    nullable: true,
  })
  @JoinColumn()
  avatar: FileEntity;

  @Column()
  description: string;
}
