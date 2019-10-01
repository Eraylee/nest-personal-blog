import { Allow } from 'class-validator';
import { QueryDto } from '../../../common/dto/query.dto';
import { ApiModelProperty } from '@nestjs/swagger';

export class QueryArticleDto extends QueryDto {
  @ApiModelProperty({ required: false, description: '文章标题' })
  @Allow()
  readonly title: string;
}
