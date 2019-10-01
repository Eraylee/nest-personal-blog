import { IsNotEmpty, IsUrl } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateCommentDto {
  @ApiModelProperty({ description: '用户主页' })
  @IsNotEmpty()
  @IsUrl()
  readonly authorUrl: string;

  @ApiModelProperty({ description: '评论内容' })
  @IsNotEmpty()
  readonly content: string;
}
