/*
 * @Author: ERAYLEE
 * @Date: 2019-12-25 21:39:59
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2019-12-29 20:29:32
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
import { PaginationDto, DeleteDto } from './base.dto';
import { BaseService } from './base.service';
import { Roles } from '../../common/decorators';
import { Result, PaginationResult } from '../interfaces';
import { RolesGuard, AuthGuard } from '../../common/guards';
import { ApiOperation } from '@nestjs/swagger';

export abstract class BaseController<T> {
  protected constructor(protected readonly baseService: BaseService<T>) {}

  /**
   * 分页查询
   * @param query
   */
  @Get()
  @ApiOperation({ title: '分页查询' })
  public async getMany(
    @Query() query: PaginationDto,
  ): Promise<Result<PaginationResult<T>>> {
    return {
      code: 200,
      message: '查询成功',
      data: await this.baseService.getMany(query),
    };
  }
  /**
   * 通过id查询
   * @param id
   */
  @ApiOperation({ title: '通过id查询' })
  @Get(':id')
  public async getOne(@Param('id') id: string): Promise<Result<T>> {
    return {
      code: 200,
      message: '查询成功',
      data: await this.baseService.getOne(id),
    };
  }
  /**
   * 删除
   * @param ids
   */
  @ApiOperation({ title: '删除' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Delete()
  public async delete(@Body() dto: DeleteDto) {
    return {
      code: 200,
      message: '删除成功',
      data: await this.baseService.delete(dto.ids),
    };
  }
}
