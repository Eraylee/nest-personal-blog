/*
 * @Author: ERAYLEE
 * @Date: 2019-12-22 22:25:46
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2020-01-12 17:08:09
 */
import { Module, forwardRef } from '@nestjs/common';
import { LinkController } from './link.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkEntity } from './link.entity';
import { LinkService } from './link.service';
import { FileEntity } from '../file/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LinkEntity, FileEntity])],
  providers: [LinkService],
  controllers: [LinkController],
  exports: [LinkService],
})
export class LinkModule {}
