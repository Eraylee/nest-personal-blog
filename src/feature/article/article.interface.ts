import { Query } from '../../common/interfaces';
import { ArticleEntity } from './article.entity';

export interface ArticlesRO extends Query {
  data: ArticleEntity[];
}
