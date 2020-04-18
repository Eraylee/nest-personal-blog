import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from './file.entity';
import { InjectConfig, ConfigService } from 'nestjs-config';
import OSS = require('ali-oss');
import { CreateFileDto } from './dto';
import { BaseService } from '../../common/base';
const BASE_PATH = '../../../public';
@Injectable()
export class FileService extends BaseService<FileEntity> {
  constructor(
    @InjectRepository(FileEntity)
    private readonly repository: Repository<FileEntity>,
    @InjectConfig()
    private readonly config: ConfigService,
  ) {
    super(repository);

    this.client = new OSS({
      cname: true,
      endpoint: config.get('ali-oss.OSS_ENDPOINT'),
      region: config.get('ali-oss.OSS_REGION'),
      accessKeyId: config.get('ali-oss.OSS_ACCESS_KEY_ID'),
      accessKeySecret: config.get('ali-oss.OSS_ACCESS_KEY_SECRET'),
      bucket: config.get('ali-oss.OSS_BUCKET'),
    });
  }
  client: OSS;
  /**
   * 上传
   * @param dto
   * @param path
   */
  // public async upload(dto: CreateFileDto, path: string) {
  //   try {
  //     const filePath = join(__dirname, BASE_PATH, 'file', path);
  //     this.checkDir(filePath);

  //     const fileName = `${Date.parse(new Date().toString())}.${
  //       dto.originalname.split('.')[1]
  //     }`;
  //     const writeFilePath = join(filePath, `${fileName}`);
  //     const writeFile = createWriteStream(writeFilePath);

  //     const file = new FileEntity();
  //     file.size = dto.size;
  //     file.mimeType = dto.mimetype;
  //     file.fieldName = path;
  //     file.originalName = dto.originalname;
  //     file.fileName = fileName;
  //     file.path = `/file/${path}/`;

  //     const res = await this.repository.save(file);

  //     await writeFile.write(dto.buffer);
  //     return res.id;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  /**
   * 文件上传
   * @param dto
   * @param path
   */
  public async upload(dto: CreateFileDto, path: string) {
    try {
      const fileName = `${Date.parse(new Date().toString())}.${
        dto.originalname.split('.')[1]
      }`;
      const writeFilePath = `/${this.config.get(
        'ali-oss.OSS_PUBLIC_PATH',
      )}/${path}/${fileName}`;
      const aliOSSresponse = await this.client.put(writeFilePath, dto.buffer);
      if (aliOSSresponse.res.status === 200) {
        const file = new FileEntity();
        file.size = dto.size;
        file.mimeType = dto.mimetype;
        file.fieldName = path;
        file.originalName = dto.originalname;
        file.fileName = aliOSSresponse.name;
        file.path = aliOSSresponse.url;

        const res = await this.repository.save(file);
        return res.id;
      }
      throw new BadRequestException('上传文件失败');
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  /**
   * 删除
   * @param id
   */
  public async removeById(id: string) {
    try {
      const file = await this.repository.findOne({ id });
      if (!file) {
        throw new BadRequestException(`id${id}的文件不存在`);
      }
      const aliOSSresponse = await this.client.get(file.fileName);
      if (aliOSSresponse.res.status === 200) {
        await this.client.delete(file.fileName);
        return await this.repository.remove(file);
      }
      throw new BadRequestException(`删除失败：oss上不存在此文件`);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  //   /**
  //    * 检查是否有文件夹，没有就新建文件夹
  //    * @param path
  //    */
  //   public checkDir(path) {
  //     if (!existsSync(path)) {
  //       mkdirSync(path);
  //     }
  //   }
  //   /**
  //    * 删除服务器文件
  //    * @param path
  //    */
  //   public deleteFile(path: string) {
  //     if (!existsSync(path)) {
  //       throw new BadRequestException(`文件或者文件路径不存在`);
  //     }
  //     unlinkSync(path);
  //   }
}
