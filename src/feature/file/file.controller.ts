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

@ApiBearerAuth()
@ApiUseTags('file')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}
  /**
   * 查询文件
   * @param fid
   * @return Promise<Result>
   */
  @ApiOperation({ title: '通过fid查询文件' })
  @Get(':fid')
  async getFile(@Param('fid') fid: string) {
    return {
      code: 200,
      message: '查询成功',
      data: await this.fileService.findByFid(fid),
    };
  }
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
   * 根据fid 删除文件
   * @param fid
   */
  @ApiOperation({ title: '通过fid删除文件' })
  @Delete('/byFid')
  async deleteFileByFid(@PlainBody() fid: string) {
    await this.fileService.removeByFid(fid);
    return {
      code: 200,
      message: '删除成功',
    };
  }
  /**
   * 批量删除文件
   * @param ids
   */
  @ApiOperation({ title: '删除文件' })
  @Delete()
  async deleteFiles(@Body('ids') ids: number[]) {
    await this.fileService.remove(ids);
    return {
      code: 200,
      message: '删除成功',
    };
  }
}
