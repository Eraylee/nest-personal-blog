/*
 * @Author: ERAYLEE
 * @Date: 2020-01-16 17:22:25
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2020-02-01 11:27:39
 */
import { IsByteLength, Allow, IsEmail, IsUrl } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateCommentDto {
  @ApiModelProperty({ description: '用户名' })
  @IsByteLength(1, 15, {
    message: '用户名长度为2~16位',
  })
  readonly authorName: string;

  @ApiModelProperty({ description: '用户邮箱' })
  @IsEmail()
  readonly authorMail: string;

  @ApiModelProperty({ required: false, description: '用户主页' })
  @IsUrl()
  readonly authorUrl?: string;

  @ApiModelProperty({ description: '评论内容' })
  @Allow()
  readonly content: string;

  @ApiModelProperty({ required: false, description: '父级评论id' })
  @Allow()
  readonly parentId?: string;

  @ApiModelProperty({ description: '文章id' })
  @Allow()
  readonly articleId: string;
}
