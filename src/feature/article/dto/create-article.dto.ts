import { IsNotEmpty, IsByteLength, Allow } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiModelProperty({ description: '标题' })
  @IsByteLength(0, 30, {
    message: '标题长度为0~30位',
  })
  readonly title: string;

  @ApiModelProperty({ description: '描述' })
  @IsNotEmpty()
  readonly description: string;

  @ApiModelProperty({ required: false, description: '是否置顶' })
  @Allow()
  readonly isTop: boolean;

  @ApiModelProperty({ required: false, description: '内容' })
  @IsNotEmpty()
  readonly content: string;

  @ApiModelProperty({ required: false, description: '是否允许评论' })
  @Allow()
  readonly allowComment: boolean;

  @ApiModelProperty({ required: false, description: '是否草稿' })
  @Allow()
  readonly isDraft: boolean;

  @ApiModelProperty({ required: false, description: '文章封面' })
  @Allow()
  readonly cover: string;

  @ApiModelProperty({ description: '文章分类id' })
  @IsNotEmpty()
  readonly categoryId: number;

  @ApiModelProperty({ description: '文章标签' })
  @IsNotEmpty()
  readonly tags: string[];
}
