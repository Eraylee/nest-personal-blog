/*
 * @Author: ERAYLEE
 * @Date: 2019-09-30 00:02:55
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2019-12-27 13:03:40
 */
import { Post, Body, Controller, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

import { RolesGuard, AuthGuard } from '../../common/guards';
import { Roles } from '../../common/decorators';
import { TagService } from './tag.service';
import { BaseController } from '../../common/base';
import { QueryTagDto, CreateTagDto, UpdateTagDto } from './dto';
import { TagEntity } from './tag.entity';

@ApiBearerAuth()
@ApiUseTags('tag')
@Controller('tag')
export class TagController extends BaseController<TagEntity> {
  constructor(private readonly service: TagService) {
    super(service);
  }
  /**
   * 新增标签
   * @param tag
   */
  @ApiOperation({ title: '新增标签' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  async create(@Body() tag: CreateTagDto) {
    return {
      code: 200,
      message: '新增成功',
      data: await this.service.create(tag),
    };
  }
}
