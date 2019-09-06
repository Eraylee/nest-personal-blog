import { ApiModelProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class QueryDto {
  @Allow()
  @ApiModelProperty({ required: false, description: '页码' })
  readonly page: number;

  @Allow()
  @ApiModelProperty({ required: false, description: '当前页显示数' })
  readonly limit: number;
}
