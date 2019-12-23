/*
 * @Author: ERAYLEE
 * @Date: 2019-09-06 21:06:33
 * @LastEditors: ERAYLEE
 * @LastEditTime: 2019-12-23 20:48:45
 */
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TagModule } from './tag/tag.module';
import { ArticleModule } from './article/article.module';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { FileModule } from './file/file.module';
import { LinkModule } from './link/link.module';

@Module({
  imports: [
    TagModule,
    LinkModule,
    UserModule,
    FileModule,
    ArticleModule,
    CommentModule,
    CategoryModule,
  ],
  exports: [
    TagModule,
    LinkModule,
    UserModule,
    FileModule,
    ArticleModule,
    CommentModule,
    CategoryModule,
  ],
})
export class FeatureModule {}
