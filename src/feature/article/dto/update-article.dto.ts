import {
  IsNotEmpty,
  Allow,
  IsDefined,
  IsBoolean,
  IsByteLength,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateArticleDto {
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

  @ApiModelProperty({ required: false, description: '内容' })
  @Allow()
  readonly content: string;

  @ApiModelProperty({ required: false, description: '是否允许评论' })
  @IsBoolean()
  readonly allowComment: boolean;

  @ApiModelProperty({ required: false, description: '是否草稿' })
  @IsBoolean()
  readonly isDraft: boolean;

  @ApiModelProperty({ required: false, description: '文章封面' })
  @Allow()
  readonly cover: string;

  @ApiModelProperty({ description: '文章分类id' })
  @IsDefined()
  @IsNotEmpty()
  readonly categoryId: number;

  @ApiModelProperty({ description: '文章标签' })
  @IsDefined()
  @IsNotEmpty()
  readonly tags: string[];
}
