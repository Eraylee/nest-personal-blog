import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiModelProperty({ description: '标签名' })
  @IsNotEmpty()
  readonly name: string;
}
