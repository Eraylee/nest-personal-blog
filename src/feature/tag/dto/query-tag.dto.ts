import { Allow } from 'class-validator';
import { QueryDto } from '../../../common/dto/query.dto';
import { ApiModelProperty } from '@nestjs/swagger';

export class QueryTagDto extends QueryDto {
  @ApiModelProperty({ required: false, description: '标签名' })
  @Allow()
  readonly name?: string;
}
