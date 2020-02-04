/*
 * @Author: ERAYLEE
 * @Date: 2020-01-16 17:22:25
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2020-02-03 20:16:03
 */
import { IsArray, IsString, IsUUID, IsEnum } from 'class-validator';
import { PaginationDto } from '../../../common/base/base.dto';
import { ApiModelProperty } from '@nestjs/swagger';

export class QueryArticleDto {
  @ApiModelProperty({ required: false, description: '文章ID' })
  @IsUUID()
  readonly id: string;
  
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

  @ApiModelProperty({ required: false, description: '文章类型' })
  @IsEnum(['normal', 'message', 'about'])
  readonly type: string;

  @ApiModelProperty({ required: false, description: '文章标签' })
  @IsArray()
  readonly tags: string[];
}

// tslint:disable-next-line: max-classes-per-file
export class QueryArticlesDto extends PaginationDto {
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

  @ApiModelProperty({ required: false, description: '文章类型' })
  @IsEnum(['normal', 'message', 'about'])
  readonly type: string;

  @ApiModelProperty({ required: false, description: '文章标签' })
  @IsArray()
  readonly tags: string[];
}
