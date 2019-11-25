import {
  IsNotEmpty,
  Allow,
  IsDefined,
  IsBoolean,
  IsByteLength,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

import { CreateArticleDto } from './create-article.dto';

export class UpdateArticleDto implements Partial<CreateArticleDto> {
  @ApiModelProperty({ description: '文章标题' })
  @IsDefined()
  @IsNotEmpty()
  @IsByteLength(0, 30, {
    message: '标题长度为1~31位',
  })
  readonly title: string;

  @ApiModelProperty({ description: '描述' })
  @IsDefined()
  @IsNotEmpty()
  readonly description: string;

  @ApiModelProperty({ required: false, description: '是否置顶' })
  @IsBoolean()
  readonly isTop: boolean;

  @ApiModelProperty({ required: false, description: 'html内容' })
  @Allow()
  readonly html: string;

  @ApiModelProperty({ required: false, description: 'markdown内容' })
  @Allow()
  readonly markdown: string;

  @ApiModelProperty({ required: false, description: '是否允许评论' })
  @IsBoolean()
  readonly allowComment: boolean;

  @ApiModelProperty({ required: false, description: '是否草稿' })
  @IsBoolean()
  readonly isDraft: boolean;

  @ApiModelProperty({ required: false, description: '文章封面' })
  @Allow()
  readonly cover: string;

  @ApiModelProperty({ required: false, description: '文章分类编号' })
  @Allow()
  readonly category: string;

  @ApiModelProperty({ description: '文章标签id集合' })
  @IsDefined()
  @IsNotEmpty()
  readonly tags: number[];
}
