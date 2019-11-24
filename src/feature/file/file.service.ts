import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { createWriteStream, existsSync, mkdirSync, unlinkSync } from 'fs';
import { join } from 'path';
import { Repository } from 'typeorm';
import { FileEntity } from './file.entity';
import { QueryFileDto, CreateFileDto } from './dto';

const BASE_PATH = '../../../public';
@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}
  /**
   * 通过文件id查询文件
   * @param fid
   */
  public async findByFid(fid: string) {
    return await this.fileRepository.findOne({ fid });
  }
  /**
   * 查询
   * @param query
   */
  public async find(query: QueryFileDto) {
    const qb = await this.fileRepository.createQueryBuilder('file');
    let offset = 0;
    let limit = 10;
    let page = 1;
    qb.where('1 = 1');

    if (query.limit) {
      limit = query.limit;
    }
    if (query.page) {
      page = query.page;
      offset = limit * (page - 1);
    }

    const total = await qb.getCount();

    qb.limit(limit)
      .offset(offset)
      .getMany();
    const data = await qb.getMany();
    return { data, total, page };
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

      const res = await this.fileRepository.save(file);

      await writeFile.write(dto.buffer);
      return res.fid;
    } catch (error) {
      throw error;
    }
  }
  /**
   * 删除
   * @param fid
   */
  public async remove(fid: string) {
    const file = await this.fileRepository.findOne({ fid });
    if (!file) {
      throw new BadRequestException(`删除fid为${fid}的文件不存在`);
    }
    const path = join(__dirname, BASE_PATH, file.path, file.fileName);
    this.deleteFile(path);
    await this.fileRepository.remove(file);
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
