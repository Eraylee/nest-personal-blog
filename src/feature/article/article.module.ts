/*
 * @Author: ERAYLEE
 * @Date: 2019-09-29 22:00:48
 * @LastEditors: ERAYLEE
 * @LastEditTime: 2020-01-01 14:03:45
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { ArticleService } from './article.service';
import { CategoryEntity } from '../category/category.entity';
import { TagEntity } from '../tag/tag.entity';
import { UserEntity } from '../user/user.entity';
import { FileEntity } from '../file/file.entity';
import { ArticleController } from './article.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ArticleEntity,
      CategoryEntity,
      TagEntity,
      UserEntity,
      FileEntity,
    ]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
