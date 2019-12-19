/*
 * @Author: ERAYLEE
 * @Date: 2019-09-29 22:00:48
 * @LastEditors: ERAYLEE
 * @LastEditTime: 2019-12-19 18:22:11
 */
import {
  IsNotEmpty,
  IsDefined,
  IsByteLength,
  Allow,
  IsBoolean,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiModelProperty({ description: '标题' })
  @IsDefined()
  @IsByteLength(0, 30, {
    message: '标题长度为0~30位',
  })
  readonly title: string;

  @ApiModelProperty({ description: '描述' })
  @IsDefined()
  @IsNotEmpty()
  readonly description: string;

  @ApiModelProperty({ required: false, description: '是否置顶' })
  @IsBoolean()
  readonly isTop?: boolean;

  @ApiModelProperty({ required: false, description: 'html内容' })
  @IsDefined()
  @IsNotEmpty()
  readonly html: string;

  @ApiModelProperty({ required: false, description: 'markdown内容' })
  @IsDefined()
  @IsNotEmpty()
  readonly markdown: string;

  @ApiModelProperty({ required: false, description: '是否允许评论' })
  @IsBoolean()
  readonly allowComment: boolean;

  @ApiModelProperty({ required: false, description: '是否草稿' })
  @IsBoolean()
  readonly isDraft?: boolean;

  @ApiModelProperty({ required: false, description: '文章封面' })
  @Allow()
  readonly cover?: string;

  @ApiModelProperty({ description: '文章分类id' })
  @IsDefined()
  @IsNotEmpty()
  readonly categoryId: number;

  @ApiModelProperty({ description: '文章标签id集合' })
  @IsDefined()
  @IsNotEmpty()
  readonly tags: number[];
}
