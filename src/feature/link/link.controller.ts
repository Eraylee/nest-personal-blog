/*
 * @Author: ERAYLEE
 * @Date: 2019-12-22 22:25:46
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2019-12-27 13:03:02
 */
import { Post, Body, Controller, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { LinkDto } from './dto';
import { LinkService } from './link.service';
import { RolesGuard, AuthGuard } from '../../common/guards';
import { Roles } from '../../common/decorators';
import { BaseController } from '../../common/base';
import { LinkEntity } from './link.entity';

@ApiBearerAuth()
@ApiUseTags('link')
@Controller('link')
export class LinkController extends BaseController<LinkEntity> {
  constructor(private readonly service: LinkService) {
    super(service);
  }
  /**
   * 新增链接
   * @param link
   */
  @ApiOperation({ title: '新增链接' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  async create(@Body() link: LinkDto) {
    return {
      code: 200,
      message: '新增成功',
      data: await this.service.create(link),
    };
  }
}
