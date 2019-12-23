/*
 * @Author: ERAYLEE
 * @Date: 2019-12-22 22:25:46
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2019-12-23 20:39:24
 */
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
} from '@nestjs/common';
import { Result } from '../../common/interfaces';
import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { LinkDto } from './dto/link.dto';
import { LinkService } from './link.service';
import { RolesGuard, AuthGuard } from '../../common/guards';
import { Roles } from '../../common/decorators';

@ApiBearerAuth()
@ApiUseTags('link')
@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}
  /**
   * 通过id查询友链
   * @param id
   */
  @ApiOperation({ title: '通过id查询友链' })
  @Get(':id')
  async getLinkById(@Param('id') id: number) {
    return {
      code: 200,
      message: '查询成功',
      data: await this.linkService.findById(id),
    };
  }
  /**
   * 通过id查询友链
   * @param id
   */
  @ApiOperation({ title: '查询友链' })
  @Get()
  async getLinks() {
    return {
      code: 200,
      message: '查询成功',
      data: await this.linkService.find(),
    };
  }
  /**
   * 修改友链
   * @param id
   * @param link
   */
  @ApiOperation({ title: '修改友链' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id')
  async updateLink(
    @Param('id') id: number,
    @Body() link: LinkDto,
  ): Promise<Result> {
    return {
      code: 200,
      message: '修改成功',
      data: await this.linkService.update(id, link),
    };
  }
  /**
   * 删除友联
   * @param ids
   */
  @ApiOperation({ title: '删除友链' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Delete()
  async deleteLink(@Body('ids') ids: number[]) {
    return {
      code: 200,
      message: '查询成功',
      data: await this.linkService.remove(ids),
    };
  }
}
