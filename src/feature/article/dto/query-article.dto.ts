/*
 * @Author: ERAYLEE
 * @Date: 2020-01-16 17:22:25
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2020-01-30 10:42:42
 */
import { IsArray, IsString } from 'class-validator';
import { PaginationDto} from '../../../common/base/base.dto'
import { ApiModelProperty } from '@nestjs/swagger';

export class QueryArticleDto extends PaginationDto {
  @ApiModelProperty({ required: false, description: '文章标题' })
  @IsString()
  readonly title: string;

  @ApiModelProperty({ required: false, description: '文章描述' })
  @IsString()
  readonly description: string;

  @ApiModelProperty({ required: false, description: '文章分类id' })
  @IsString()
  readonly categoryId: string;

  @ApiModelProperty({ required: false, description: '文章内容' })
  @IsString()
  readonly html: string;

  @ApiModelProperty({ required: false, description: '文章标签' })
  @IsArray()
  readonly tags: string[];
}
