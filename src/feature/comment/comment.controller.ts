/*
 * @Author: ERAYLEE
 * @Date: 2020-01-16 17:22:25
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2020-02-03 11:42:09
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
} from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CreateCommentDto, UpdateCommentDto } from './dto';

import { RolesGuard, AuthGuard } from '../../common/guards';
import { Roles } from '../../common/decorators';
import { CommentService } from './comment.service';
import { BaseController } from '../../common/base';
import { CommentEntity } from './comment.entity';

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
  async queryByArticleId(@Param('id') id: string) {
    return {
      code: 200,
      message: '查询成功',
      data: await this.service.queryByArticleId(id),
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
    const ip = req['ip'];
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
}
