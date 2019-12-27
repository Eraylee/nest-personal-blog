import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { createWriteStream, existsSync, mkdirSync, unlinkSync } from 'fs';
import { join } from 'path';
import { Repository } from 'typeorm';
import { FileEntity } from './file.entity';
import { QueryFileDto, CreateFileDto } from './dto';
import { BaseService } from '../../common/base';
const BASE_PATH = '../../../public';
@Injectable()
export class FileService extends BaseService<FileEntity> {
  constructor(
    @InjectRepository(FileEntity)
    private readonly repository: Repository<FileEntity>,
  ) {
    super(repository);
  }
  /**
   * 上传
   * @param dto
   * @param path
   */
  public async upload(dto: CreateFileDto, path: string) {
    try {
      const filePath = join(__dirname, BASE_PATH, 'file', path);
      this.checkDir(filePath);

      const fileName = `${Date.parse(new Date().toString())}.${
        dto.originalname.split('.')[1]
      }`;
      const writeFilePath = join(filePath, `${fileName}`);
      const writeFile = createWriteStream(writeFilePath);

      const file = new FileEntity();
      file.size = dto.size;
      file.mimeType = dto.mimetype;
      file.fieldName = path;
      file.originalName = dto.originalname;
      file.fileName = fileName;
      file.path = `/file/${path}/`;

      const res = await this.repository.save(file);

      await writeFile.write(dto.buffer);
      return res.id;
    } catch (error) {
      throw error;
    }
  }
  /**
   * 删除
   * @param id
   */
  public async removeById(id: string) {
    const file = await this.repository.findOne({ id });
    if (!file) {
      throw new BadRequestException(`id${id}的文件不存在`);
    }
    const path = join(__dirname, BASE_PATH, file.path, file.fileName);
    this.deleteFile(path);
    await this.repository.remove(file);
  }
  /**
   * 检查是否有文件夹，没有就新建文件夹
   * @param path
   */
  public checkDir(path) {
    if (!existsSync(path)) {
      mkdirSync(path);
    }
  }
  /**
   * 删除服务器文件
   * @param path
   */
  public deleteFile(path: string) {
    if (!existsSync(path)) {
      throw new BadRequestException(`文件或者文件路径不存在`);
    }
    unlinkSync(path);
  }
}
