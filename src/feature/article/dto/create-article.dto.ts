/*
 * @Author: ERAYLEE
 * @Date: 2019-09-29 22:00:48
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2020-01-01 13:52:52
 */
import {
  IsNotEmpty,
  IsDefined,
  Length,
  IsUUID,
  IsBoolean,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiModelProperty({ description: '标题' })
  @IsDefined()
  @Length(0, 19, {
    message: '标题长度为1~20位',
  })
  readonly title: string;

  @ApiModelProperty({ description: '描述' })
  @IsDefined()
  @Length(0, 29, {
    message: '描述长度为1~30位',
  })
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

  @ApiModelProperty({ required: false, description: '文章封面Id' })
  @IsDefined()
  @IsUUID()
  readonly coverId: string;

  @ApiModelProperty({ description: '文章分类id' })
  @IsDefined()
  @IsUUID()
  readonly categoryId: string;

  @ApiModelProperty({ description: '文章标签id集合' })
  @IsDefined()
  @IsNotEmpty()
  readonly tags: string[];
}
