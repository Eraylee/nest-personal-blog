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
  Req,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Result } from '../../common/interfaces';
import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

import { CreateFileDto, QueryFileDto } from './dto';
import { FileService } from './file.service';

@ApiBearerAuth()
@ApiUseTags('file')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}
  /**
   * 查询文件
   * @param query
   * @return Promise<Result>
   */
  @ApiOperation({ title: '查询文件' })
  @Get()
  async getFiles(@Query() query: QueryFileDto) {
    return {
      code: 200,
      message: '查询成功',
      data: await this.fileService.find(query),
    };
  }

  @ApiOperation({ title: '上传文件' })
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() files: CreateFileDto) {
    return {
      code: 200,
      message: '上传成功',
      data: await this.fileService.upload(files),
    };
  }
}
