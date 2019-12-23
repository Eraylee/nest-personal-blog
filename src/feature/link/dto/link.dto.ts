/*
 * @Author: ERAYLEE
 * @Date: 2019-12-22 22:25:46
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2019-12-23 08:57:14
 */
import { IsNotEmpty, IsUrl, IsDefined } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { LinkEntity } from '../link.entity';

export class LinkDto implements Partial<LinkEntity> {
  @ApiModelProperty({ description: '拥有者' })
  @IsDefined()
  @IsNotEmpty()
  readonly owner: string;

  @ApiModelProperty({ description: '链接地址' })
  @IsDefined()
  @IsUrl()
  readonly url: string;

  @ApiModelProperty({ description: '描述' })
  @IsDefined()
  @IsNotEmpty()
  readonly description: string;
}
