import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('file')
export class FileEntity {
  @PrimaryGeneratedColumn()
  public id: number;

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

  @Column()
  @Generated('uuid')
  public fid: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
