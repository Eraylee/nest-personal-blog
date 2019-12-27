/*
 * @Author: ERAYLEE
 * @Date: 2019-12-25 22:22:58
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2019-12-25 22:38:06
 */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, IsEnum } from 'class-validator';

export class PaginationDto {
  @ApiModelProperty({ required: false, description: '页码' })
  @IsNumber()
  readonly page?: number;

  @ApiModelProperty({ required: false, description: '每页显示多少' })
  @IsNumber()
  readonly limit?: number;

  @ApiModelProperty({ required: false, description: '排序' })
  @IsEnum(['DESC', 'ASC'])
  readonly sort?: 'DESC' | 'ASC';
}
