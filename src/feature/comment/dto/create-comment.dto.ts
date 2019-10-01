import {
  IsNotEmpty,
  IsByteLength,
  Allow,
  IsEmail,
  IsUrl,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiModelProperty({ description: '用户名' })
  @IsByteLength(1, 15, {
    message: '用户名长度为1~15位',
  })
  readonly authorName: string;

  @ApiModelProperty({ description: '用户邮箱' })
  @IsEmail()
  readonly authorMail: string;

  @ApiModelProperty({ required: false, description: '用户主页' })
  @Allow()
  @IsUrl()
  readonly authorUrl: string;

  @ApiModelProperty({ description: '评论内容' })
  @IsNotEmpty()
  readonly content: string;

  @ApiModelProperty({ required: false, description: '父级评论id' })
  @Allow()
  readonly parentId: number;

  @ApiModelProperty({ description: '文章id' })
  @IsNotEmpty()
  readonly articleId: number;
}
