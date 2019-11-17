import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { Repository, DeleteResult } from 'typeorm';
import { ConfigService, InjectConfig } from 'nestjs-config';
import { FileEntity } from './file.entity';
import { QueryFileDto, CreateFileDto } from './dto';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,

    @InjectConfig()
    private readonly config: ConfigService,
  ) {}
  /**
   * 查询
   * @param query
   */
  async find(query: QueryFileDto) {
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
  async upload(file: CreateFileDto) {
    const filePath = join(
      __dirname,
      '../../',
      'upload',
      `${file.originalname}`,
    );
    const writeImage = createWriteStream(filePath);

    writeImage.write(file.buffer);
  }
}
