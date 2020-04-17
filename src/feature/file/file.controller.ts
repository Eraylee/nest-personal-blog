/*
 * @Author: ERAYLEE
 * @Date: 2019-11-17 16:09:01
 * @LastEditors: ERAYLEE
 * @LastEditTime: 2020-04-17 17:56:12
 */
import {
  Get,
  Post,
  Body,
  Delete,
  Controller,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Param,
} from '@nestjs/common';
import { Roles } from '../../common/decorators';
import { RolesGuard, AuthGuard } from '../../common/guards';
import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { CreateFileDto } from './dto';
import { FileService } from './file.service';
import { BaseController } from '../../common/base';
import { FileEntity } from './file.entity';

@ApiBearerAuth()
@ApiUseTags('file')
@Controller('file')
export class FileController extends BaseController<FileEntity> {
  constructor(private readonly service: FileService) {
    super(service);
  }
  /**
   * 上传文件
   * @param files
   * @param path
   */
  @ApiOperation({ title: '上传文件' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() files: CreateFileDto,
    @Body('path') path: string,
  ) {
    return {
      code: 200,
      message: '上传成功',
      data: await this.service.upload(files, path),
    };
  }
  /**
   * 根据id 删除文件
   * @param id
   */
  @ApiOperation({ title: '删除文件' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async deleteFile(@Param('id') id: string) {
    return {
      code: 200,
      message: '删除成功',
      data: await this.service.removeById(id),
    };
  }
}
