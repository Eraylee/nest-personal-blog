import { IsNotEmpty, IsDefined } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiModelProperty({ description: '标签名' })
  @IsDefined()
  @IsNotEmpty()
  readonly name: string;
}
