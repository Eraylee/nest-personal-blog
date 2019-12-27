/*
 * @Author: ERAYLEE
 * @Date: 2019-10-01 00:46:38
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2019-12-27 14:12:56
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
  async getcategorys() {
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
  async createcategory(@Body() category: CreateCategoryDto) {
    return {
      code: 200,
      message: '新增成功',
      data: await this.service.create(category),
    };
  }
}
