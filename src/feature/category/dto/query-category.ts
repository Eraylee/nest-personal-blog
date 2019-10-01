import { Allow } from 'class-validator';
import { QueryDto } from '../../../common/dto/query.dto';

export class QueryCategoryDto extends QueryDto {
  @Allow()
  readonly name: string;

  @Allow()
  readonly enabled: boolean;

  @Allow()
  readonly parentId: number;
}
