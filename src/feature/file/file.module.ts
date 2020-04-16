/*
 * @Author: ERAYLEE
 * @Date: 2020-01-16 17:22:25
 * @LastEditors: ERAYLEE
 * @LastEditTime: 2020-04-16 15:35:44
 */
import { Module, forwardRef } from '@nestjs/common';

import { FileController } from './file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './file.entity';
import { FileService } from './file.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  providers: [FileService],
  controllers: [FileController],
  exports: [FileService],
})
export class FileModule {}
