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
import { Result } from '../../common/interfaces';
import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

import { RolesGuard, AuthGuard } from '../../common/guards';
import { Roles } from '../../common/decorators';
import { CategoryService } from './category.service';
import { UpdateCategoryDto, CreateCategoryDto } from './dto';

@ApiBearerAuth()
@ApiUseTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  /**
   * 通过id查询分类
   * @param id
   * @return Promise<Result>
   */
  @ApiOperation({ title: '通过id查询分类' })
  @UseGuards(AuthGuard)
  @Get(':id')
  async getcategoryById(@Param('id') id: number) {
    return {
      code: 200,
      message: '查询成功',
      data: await this.categoryService.findById(id),
    };
  }
  /**
   * 查询分类树
   * @return Promise<Result>
   */
  @ApiOperation({ title: '查询分类' })
  @Get()
  async getcategorys() {
    return {
      code: 200,
      message: '查询成功',
      data: await this.categoryService.findTree(),
    };
  }
  /**
   * 新增分类
   * @param category
   * @return Promise<Result>
   */
  @ApiOperation({ title: '新增分类' })
  @UseGuards(RolesGuard, AuthGuard)
  @Roles('admin')
  @Post()
  async createcategory(@Body() category: CreateCategoryDto): Promise<Result> {
    return {
      code: 200,
      message: '新增成功',
      data: await this.categoryService.create(category),
    };
  }
  /**
   * 删除分类
   * @param id
   * @return Promise<Result>
   */
  @ApiOperation({ title: '删除分类' })
  @UseGuards(RolesGuard, AuthGuard)
  @Roles('admin')
  @Delete(':id')
  async deletecategory(@Param('id') id: number) {
    return {
      code: 200,
      message: '删除成功',
      data: await this.categoryService.delete(id),
    };
  }
  /**
   * 修改分类
   * @param category
   * @return Promise<Result>
   */
  @ApiOperation({ title: '修改分类' })
  @UseGuards(RolesGuard, AuthGuard)
  @Roles('admin')
  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() category: UpdateCategoryDto,
  ): Promise<Result> {
    return {
      code: 200,
      message: '修改成功',
      data: await this.categoryService.update(id, category),
    };
  }
}
