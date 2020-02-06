/*
 * @Author: ERAYLEE
 * @Date: 2020-01-16 17:22:25
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2020-02-06 10:25:04
 */
import {
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Controller,
  UseGuards,
  Req,
  Request,
  Query,
} from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import {
  CreateCommentDto,
  UpdateCommentDto,
  QueryCommentsByArticleIdDto,
} from './dto';

import { RolesGuard, AuthGuard } from '../../common/guards';
import { Roles } from '../../common/decorators';
import { CommentService } from './comment.service';
import { BaseController } from '../../common/base';
import { CommentEntity } from './comment.entity';
import { DeleteDto } from '../../common/base/base.dto';

@ApiBearerAuth()
@ApiUseTags('comment')
@Controller('comment')
export class CommentController extends BaseController<CommentEntity> {
  constructor(private readonly service: CommentService) {
    super(service);
  }
  /**
   * 通过文章id查询
   * @param id
   */
  @ApiOperation({ title: '通过文章id查询' })
  @Get('/byArticleId/:id')
  async queryByArticleId(
    @Param('id') id: string,
    @Query() query: QueryCommentsByArticleIdDto,
  ) {
    return {
      code: 200,
      message: '查询成功',
      data: await this.service.queryByArticleId(id, query),
    };
  }
  /**
   * 新增评论
   * @param comment
   * @param req
   */
  @ApiOperation({ title: '新增评论' })
  @Post()
  async createComment(@Body() comment: CreateCommentDto, @Req() req: Request) {
    const ip = req.headers['x-real-ip'] || req['connection'].remoteAddress;
    const agent = req.headers['user-agent'];
    return {
      code: 200,
      message: '新增成功',
      data: await this.service.createComment(comment, ip, agent),
    };
  }
  /**
   * 修改评论
   * @param id
   * @param comment
   */
  @ApiOperation({ title: '修改评论' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id')
  async updateComment(
    @Param('id') id: string,
    @Body() comment: UpdateCommentDto,
  ) {
    return {
      code: 200,
      message: '修改成功',
      data: await this.service.updateComment(id, comment),
    };
  }
  /**
   * 软删除
   * @param ids
   */
  @ApiOperation({ title: '删除' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Delete('/soft')
  public async softDelete(@Body() dto: DeleteDto) {
    return {
      code: 200,
      message: '删除成功',
      data: await this.service.softDelete(dto.ids),
    };
  }
}
