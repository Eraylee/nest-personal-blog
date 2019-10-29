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
import { Result } from '../../common/interfaces';
import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CreateCommentDto, UpdateCommentDto } from './dto';

import { RolesGuard, AuthGuard } from '../../common/guards';
import { Roles } from '../../common/decorators';
import { CommentService } from './comment.service';

@ApiBearerAuth()
@ApiUseTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  /**
   * 通过id查询评论
   * @param id
   */
  @ApiOperation({ title: '通过id查询评论' })
  @Get(':id')
  async getComment(@Param('id') id: number): Promise<Result> {
    return {
      code: 200,
      message: '查询成功',
      data: await this.commentService.findById(id),
    };
  }
  /**
   * 通过id查询评论树
   * @param id
   */
  @ApiOperation({ title: '通过id查询评论树' })
  @Get(':id/tree')
  async getCommentTree(@Param('id') id: number): Promise<Result> {
    return {
      code: 200,
      message: '查询成功',
      data: await this.commentService.findTree(id),
    };
  }
  /**
   * 新增评论
   * @param comment
   * @param req
   */
  @ApiOperation({ title: '新增评论' })
  @Post()
  async createComment(
    @Body() comment: CreateCommentDto,
    @Req() req: Request,
  ): Promise<Result> {
    const ip = '';
    const agent = '';
    return {
      code: 200,
      message: '新增成功',
      data: await this.commentService.create(comment, ip, agent),
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
    @Param('id') id: number,
    @Body() comment: UpdateCommentDto,
  ): Promise<Result> {
    return {
      code: 200,
      message: '修改成功',
      data: await this.commentService.update(id, comment),
    };
  }
  /**
   * 删除评论
   * @param id
   */
  @ApiOperation({ title: '删除评论' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async deleteComment(@Param('id') id: number) {
    return {
      code: 200,
      message: '删除成功',
      data: await this.commentService.delete(id),
    };
  }
}
