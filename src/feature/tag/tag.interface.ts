import { Query } from '../../../../gql-nestjs-eraylee-blog-server/src/common/interfaces';
import { TagEntity } from './tag.entity';

export interface TagsRO extends Query {
  data: TagEntity[];
}
