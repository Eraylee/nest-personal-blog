/*
 * @Author: ERAYLEE
 * @Date: 2019-09-29 22:00:48
 * @LastEditors: ERAYLEE
 * @LastEditTime: 2019-12-26 18:16:42
 */
import { IsNotEmpty, Allow, IsDefined, IsBoolean } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiModelProperty({ required: false, description: '分类名' })
  @Allow()
  readonly name: string;

  @ApiModelProperty({ required: false, description: '是否启用' })
  @IsBoolean()
  readonly enabled: boolean;

  @ApiModelProperty({ required: false, description: '父级分类' })
  @Allow()
  readonly parentId?: string;
}
