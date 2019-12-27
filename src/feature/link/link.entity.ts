/*
 * @Author: ERAYLEE
 * @Date: 2019-12-22 22:25:46
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2019-12-26 18:06:01
 */
import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/base/base.entity';

@Entity('link')
export class LinkEntity extends BaseEntity {
  @Column()
  owner: string;

  @Column()
  url: string;

  @Column()
  description: string;
}
