import { Query } from '../../../../gql-nestjs-eraylee-blog-server/src/common/interfaces';
import { ArticleEntity } from './article.entity';

export interface ArticlesRO extends Query {
  data: ArticleEntity[];
}
