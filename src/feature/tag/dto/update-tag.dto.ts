import { IsNotEmpty, Allow } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateTagDto {
  @ApiModelProperty({ description: '标签名' })
  @IsNotEmpty()
  readonly name: string;
}
