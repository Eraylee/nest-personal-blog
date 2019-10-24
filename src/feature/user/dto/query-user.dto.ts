import { ApiModelProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { QueryDto } from '../../../common/dto/query.dto';

export class QueryUserDto extends QueryDto {
  @Allow()
  @ApiModelProperty({ required: false, description: '用户名' })
  readonly username?: string;

  @Allow()
  @ApiModelProperty({ required: false, description: '用户昵称' })
  readonly nickname?: string;
}
