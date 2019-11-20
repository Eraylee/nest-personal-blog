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
import { PlainBody } from '../../common/decorators';
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
    return await this.fileService.upload(files, path);
  }
  /**
   * 删除文件
   * @param fid
   */
  @ApiOperation({ title: '删除文件' })
  @Delete()
  async deleteFile(@PlainBody() fid: string) {
    await this.fileService.remove(fid);
    return {
      code: 200,
      message: '删除成功',
    };
  }
  /**
   * 通过文件名删除文件
   * @param fileName
   */
  @ApiOperation({ title: '删除文件' })
  @Delete('/fileName')
  async deleteFileByPath(@Query('fileName') fileName: string) {
    await this.fileService.removeByFileName(fileName);
    return {
      code: 200,
      message: '删除成功',
    };
  }
}
