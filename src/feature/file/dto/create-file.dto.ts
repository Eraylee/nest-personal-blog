import { IsNotEmpty, IsDefined, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { FileEntity } from '../file.entity';

export class CreateFileDto {
  readonly buffer: any;
  readonly encoding: string;
  readonly fieldname: string;
  readonly mimetype: string;
  readonly originalname: string;
  readonly size: number;
}
