/*
 * @Author: ERAYLEE
 * @Date: 2019-12-25 22:22:58
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2020-01-04 23:13:00
 */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, IsEnum, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationDto {
  @ApiModelProperty({ required: false, description: '页码' })
  @IsNumber()
  @Transform(value => Number(value))
  readonly page?: number;

  @ApiModelProperty({ required: false, description: '每页显示多少' })
  @IsNumber()
  @Transform(value => Number(value))
  readonly limit?: number;

  @ApiModelProperty({ required: false, description: '排序' })
  @IsEnum(['DESC', 'ASC'])
  readonly sort?: 'DESC' | 'ASC';
}

// tslint:disable-next-line: max-classes-per-file
export class DeleteDto {
  @ApiModelProperty({ description: 'ids' })
  @IsArray()
  readonly ids: string[];
}
