/*
 * @Author: ERAYLEE
 * @Date: 2019-12-25 22:22:58
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2019-12-29 21:35:24
 */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumberString, IsEnum, IsArray } from 'class-validator';

export class PaginationDto {
  @ApiModelProperty({ required: false, description: '页码' })
  @IsNumberString()
  readonly page?: number;

  @ApiModelProperty({ required: false, description: '每页显示多少' })
  @IsNumberString()
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
