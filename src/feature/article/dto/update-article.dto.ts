/*
 * @Author: ERAYLEE
 * @Date: 2019-09-29 22:00:48
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2020-02-04 18:48:26
 */
import {
  Allow,
  IsBoolean,
  IsUUID,
  IsByteLength,
  IsEnum,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

import { CreateArticleDto } from './create-article.dto';

export class UpdateArticleDto implements Partial<CreateArticleDto> {
  @ApiModelProperty({ required: false, description: '文章标题' })
  @Allow()
  @IsByteLength(0, 30, {
    message: '标题长度为1~31位',
  })
  readonly title: string;

  @ApiModelProperty({ required: false, description: '描述' })
  @Allow()
  readonly description: string;

  @ApiModelProperty({ required: false, description: '是否置顶' })
  @IsBoolean()
  readonly isTop: boolean;

  @ApiModelProperty({ required: false, description: 'html内容' })
  @Allow()
  readonly html: string;

  @ApiModelProperty({ required: false, description: '文章类型' })
  @IsEnum(['normal', 'message', 'about'])
  readonly type: string;

  @ApiModelProperty({ required: false, description: 'markdown内容' })
  @Allow()
  readonly markdown: string;

  @ApiModelProperty({ required: false, description: '是否允许评论' })
  @IsBoolean()
  readonly allowComment: boolean;

  @ApiModelProperty({ required: false, description: '是否草稿' })
  @IsBoolean()
  readonly isDraft: boolean;

  @ApiModelProperty({ required: false, description: '文章封面id' })
  @Allow()
  readonly coverId: string;

  @ApiModelProperty({ required: false, description: '文章分类id' })
  @Allow()
  readonly categoryId: string;

  @ApiModelProperty({ required: false, description: '文章标签id集合' })
  readonly tags: string[];
}
