/*
 * @Author: ERAYLEE
 * @Date: 2019-11-17 16:09:01
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2019-12-27 13:08:03
 */
import {
  Get,
  Post,
  Body,
  Delete,
  Controller,
  Query,
  UseInterceptors,
  UploadedFile,
  Param,
} from '@nestjs/common';
import { PlainBody } from '../../common/decorators';
import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

import { CreateFileDto, QueryFileDto } from './dto';
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
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() files: CreateFileDto,
    @Body('path') path: string,
  ) {
    return await this.service.upload(files, path);
  }
  /**
   * 根据id 删除文件
   * @param id
   */
  @ApiOperation({ title: '通过fid删除文件' })
  @Delete()
  async deleteFileByFid(@PlainBody() id: string) {
    await this.service.removeById(id);
    return {
      code: 200,
      message: '删除成功',
    };
  }
}
