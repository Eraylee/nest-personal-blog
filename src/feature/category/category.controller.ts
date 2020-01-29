/*
 * @Author: ERAYLEE
 * @Date: 2019-10-01 00:46:38
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2020-01-29 13:33:47
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
} from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

import { RolesGuard, AuthGuard } from '../../common/guards';
import { Roles } from '../../common/decorators';
import { CategoryService } from './category.service';
import { UpdateCategoryDto, CreateCategoryDto } from './dto';
import { BaseController } from '../../common/base';
import { CategoryEntity } from './category.entity';

@ApiBearerAuth()
@ApiUseTags('category')
@Controller('category')
export class CategoryController extends BaseController<CategoryEntity> {
  constructor(private readonly service: CategoryService) {
    super(service);
  }
  /**
   * 查询分类树
   * @return Promise<Result>
   */
  @ApiOperation({ title: '查询分类' })
  @Get('/all')
  async getCategorys() {
    return {
      code: 200,
      message: '查询成功',
      data: await this.service.findAll(),
    };
  }
  /**
   * 新增分类
   * @param category
   * @return Promise<Result>
   */
  @ApiOperation({ title: '新增分类' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  async createCategory(@Body() category: CreateCategoryDto) {
    return {
      code: 200,
      message: '新增成功',
      data: await this.service.create(category),
    };
  }
  /**
   * 删除分类
   * @param id
   */
  @ApiOperation({ title: '删除分类' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async removeCategory(@Param('id') id: string) {
    return {
      code: 200,
      message: '删除成功',
      data: await this.service.remove(id),
    };
  }
}
