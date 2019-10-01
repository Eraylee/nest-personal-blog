import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TagModule } from './tag/tag.module';
import { ArticleModule } from './article/article.module';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    UserModule,
    TagModule,
    ArticleModule,
    CategoryModule,
    CommentModule,
  ],
  exports: [
    UserModule,
    TagModule,
    ArticleModule,
    CategoryModule,
    CommentModule,
  ],
})
export class FeatureModule {}
