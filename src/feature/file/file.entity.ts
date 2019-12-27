/*
 * @Author: ERAYLEE
 * @Date: 2019-11-17 15:08:07
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2019-12-26 18:13:13
 */
import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/base/base.entity';

@Entity('file')
export class FileEntity extends BaseEntity {
  @Column()
  public path: string;

  @Column()
  public originalName: string;

  @Column()
  public fileName: string;

  @Column({
    type: 'int',
  })
  public size: number;

  @Column()
  public fieldName: string;

  @Column()
  public mimeType: string;
}
