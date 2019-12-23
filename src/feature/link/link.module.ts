/*
 * @Author: ERAYLEE
 * @Date: 2019-12-22 22:25:46
 * @LastEditors: ERAYLEE
 * @LastEditTime: 2019-12-23 13:55:28
 */
import { Module, forwardRef } from '@nestjs/common';
import { LinkController } from './link.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkEntity } from './link.entity';
import { LinkService } from './link.service';

@Module({
  imports: [TypeOrmModule.forFeature([LinkEntity])],
  providers: [LinkService],
  controllers: [LinkController],
  exports: [LinkService],
})
export class LinkModule {}
