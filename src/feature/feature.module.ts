import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TagModule } from './tag/tag.module';
import { ArticleModule } from './article/article.module';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    TagModule,
    UserModule,
    FileModule,
    ArticleModule,
    CommentModule,
    CategoryModule,
  ],
  exports: [
    TagModule,
    UserModule,
    FileModule,
    ArticleModule,
    CommentModule,
    CategoryModule,
  ],
})
export class FeatureModule {}
