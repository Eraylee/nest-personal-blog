import {
  IsNotEmpty,
  IsByteLength,
  Allow,
  IsEmail,
  IsUrl,
  IsDefined,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiModelProperty({ description: '用户名' })
  @IsDefined()
  @IsByteLength(1, 15, {
    message: '用户名长度为2~16位',
  })
  readonly authorName: string;

  @ApiModelProperty({ description: '用户邮箱' })
  @IsDefined()
  @IsEmail()
  readonly authorMail: string;

  @ApiModelProperty({ required: false, description: '用户主页' })
  @IsUrl()
  readonly authorUrl?: string;

  @ApiModelProperty({ description: '评论内容' })
  @IsDefined()
  @IsNotEmpty()
  readonly content: string;

  @ApiModelProperty({ required: false, description: '父级评论id' })
  @Allow()
  readonly parentId?: number;

  @ApiModelProperty({ description: '文章id' })
  @IsDefined()
  @IsNotEmpty()
  readonly articleId: number;
}
