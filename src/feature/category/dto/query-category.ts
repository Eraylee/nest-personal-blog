/*
 * @Author: ERAYLEE
 * @Date: 2019-09-29 22:00:48
 * @LastEditors: ERAYLEE
 * @LastEditTime: 2019-12-19 18:08:37
 */
import { Allow } from 'class-validator';
import { QueryDto } from '../../../common/dto/query.dto';
import { ApiModelProperty } from '@nestjs/swagger';

export class QueryCategoryDto extends QueryDto {
  @ApiModelProperty({ required: false, description: '分类名' })
  @Allow()
  readonly name?: string;

  @ApiModelProperty({ required: false, description: '启用状态' })
  @Allow()
  readonly enabled?: boolean;

  @ApiModelProperty({ required: false, description: '父级分类id' })
  @Allow()
  readonly parentId?: number;
}
