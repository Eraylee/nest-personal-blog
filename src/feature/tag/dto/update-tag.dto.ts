import { Allow } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateTagDto {
  @ApiModelProperty({ required: false, description: '标签名' })
  @Allow()
  readonly name: string;

  @ApiModelProperty({ required: false, description: '标签颜色' })
  @Allow()
  readonly color: string;
}
