import { Allow } from 'class-validator';
import { QueryDto } from '../../../common/dto/query.dto';
import { ApiModelProperty } from '@nestjs/swagger';

export class QueryCategoryDto extends QueryDto {
  @ApiModelProperty({ required: false, description: '分类名' })
  @Allow()
  readonly name?: string;

  @ApiModelProperty({ required: false, description: '分类标识' })
  @Allow()
  readonly code?: boolean;

  @ApiModelProperty({ required: false, description: '启用状态' })
  @Allow()
  readonly enabled?: boolean;

  @ApiModelProperty({ required: false, description: '父级分类id' })
  @Allow()
  readonly parentId?: number;
}
