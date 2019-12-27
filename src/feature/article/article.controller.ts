import {
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Controller,
  Query,
  UseGuards,
  Req,
  Request,
} from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CreateArticleDto, UpdateArticleDto, QueryArticleDto } from './dto';

import { ArticleService } from './article.service';
import { RolesGuard, AuthGuard } from '../../common/guards';
import { Roles, User } from '../../common/decorators';
import { UserEntity } from '../user/user.entity';
import { BaseController } from '../../common/base';
import { ArticleEntity } from './article.entity';

@ApiBearerAuth()
@ApiUseTags('article')
@Controller('article')
export class ArticleController extends BaseController<ArticleEntity> {
  constructor(private readonly articleService: ArticleService) {
    super(articleService);
  }
  // /**
  //  * 通过id查询文章
  //  * @param query
  //  * @return Promise<Result>
  //  */
  // @ApiOperation({ title: '通过id查询文章' })
  // @Get(':id')
  // async getArticleById(@Param('id') id: number) {
  //   return {
  //     code: 200,
  //     message: '查询成功',
  //     data: await this.articleService.findById(id),
  //   };
  // }
  // /**
  //  * 查询文章
  //  * @param query
  //  * @return Promise<Result>
  //  */
  // @ApiOperation({ title: '查询文章' })
  // @Get()
  // async getArticles(@Query() query: QueryArticleDto) {
  //   return {
  //     code: 200,
  //     message: '查询成功',
  //     data: await this.articleService.find(query),
  //   };
  // }
  /**
   * 新增文章
   * @param article
   * @param user
   */
  @ApiOperation({ title: '新增文章' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  async createArticle(
    @Body() article: CreateArticleDto,
    @User() user: UserEntity,
  ) {
    return {
      code: 200,
      message: '新增成功',
      data: await this.articleService.createArticle(article, user),
    };
  }
  // /**
  //  * 删除文章
  //  * @param ids
  //  */
  // @ApiOperation({ title: '删除文章' })
  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles('admin')
  // @Delete()
  // async deleteArticles(@Body('ids') ids: number[]) {
  //   return {
  //     code: 200,
  //     message: '删除成功',
  //     data: await this.articleService.remove(ids),
  //   };
  // }
  // /**
  //  * 修改文章
  //  * @param id
  //  * @param article
  //  */
  // @ApiOperation({ title: '修改文章' })
  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles('admin')
  // @Put(':id')
  // async updateArticle(
  //   @Param('id') id: number,
  //   @Body() article: UpdateArticleDto,
  // ) {
  //   return {
  //     code: 200,
  //     message: '修改成功',
  //     data: await this.articleService.update(id, article),
  //   };
  // }
}
