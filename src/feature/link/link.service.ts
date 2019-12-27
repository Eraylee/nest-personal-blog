/*
 * @Author: ERAYLEE
 * @Date: 2019-12-22 22:25:46
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2019-12-27 12:56:09
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { BadRequestException } from '@nestjs/common/exceptions';

import { LinkEntity } from './link.entity';
import { BaseService } from '../../common/base';
@Injectable()
export class LinkService extends BaseService<LinkEntity> {
  constructor(
    @InjectRepository(LinkEntity)
    protected readonly repository: Repository<LinkEntity>,
  ) {
    super(repository);
  }
}
