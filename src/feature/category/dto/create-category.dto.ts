/*
 * @Author: ERAYLEE
 * @Date: 2019-09-29 22:00:48
 * @LastEditors: ERAYLEE
 * @LastEditTime: 2019-12-19 18:08:25
 */
import { IsNotEmpty, IsBoolean, IsDefined, Allow } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiModelProperty({ description: '分类名' })
  @IsDefined()
  @IsNotEmpty()
  readonly name: string;

  @ApiModelProperty({ description: '是否启用' })
  @IsDefined()
  @IsBoolean()
  readonly enabled: boolean;

  @ApiModelProperty({ required: false, description: '父级分类' })
  @Allow()
  readonly parentId?: string;
}
