import { IsNotEmpty, IsUrl, IsDefined } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateCommentDto {
  @ApiModelProperty({ description: '用户主页' })
  @IsUrl()
  readonly authorUrl: string;

  @ApiModelProperty({ description: '评论内容' })
  @IsDefined()
  @IsNotEmpty()
  readonly content: string;
}
