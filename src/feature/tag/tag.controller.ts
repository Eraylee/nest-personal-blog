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

import { RolesGuard, AuthGuard } from '../../common/guards';
import { Roles } from '../../common/decorators';
import { TagService } from './tag.service';
import { QueryTagDto, CreateTagDto, UpdateTagDto } from './dto';

@ApiBearerAuth()
@ApiUseTags('tag')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}
  /**
   * 通过id查询标签
   * @param query
   * @return Promise<Result>
   */
  @ApiOperation({ title: '通过id查询标签' })
  @UseGuards(AuthGuard)
  @Get(':id')
  async getTagById(@Param('id') id: number) {
    return {
      code: 200,
      message: '查询成功',
      data: await this.tagService.findById(id),
    };
  }
  /**
   * 查询标签
   * @param query
   * @return Promise<Result>
   */
  @ApiOperation({ title: '查询标签' })
  @UseGuards(AuthGuard)
  @Get()
  async getTags(@Query() query: QueryTagDto) {
    return {
      code: 200,
      message: '查询成功',
      data: await this.tagService.find(query),
    };
  }
  /**
   * 新增标签
   * @param tag
   * @return Promise<Result>
   */
  @ApiOperation({ title: '新增标签' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  async createTag(@Body() tag: CreateTagDto): Promise<Result> {
    return {
      code: 200,
      message: '新增成功',
      data: await this.tagService.create(tag),
    };
  }
  /**
   * 删标签
   * @param id
   * @return Promise<Result>
   */
  @ApiOperation({ title: '删除标签' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async deleteTag(@Param('id') id: number) {
    return {
      code: 200,
      message: '删除成功',
      data: await this.tagService.delete(id),
    };
  }

  /**
   * 修改标签
   * @param tag
   * @return Promise<Result>
   */
  @ApiOperation({ title: '修改标签' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id')
  async updateTag(
    @Param('id') id: number,
    @Body() tag: UpdateTagDto,
  ): Promise<Result> {
    return {
      code: 200,
      message: '修改成功',
      data: await this.tagService.update(id, tag),
    };
  }
}
