import { IsNotEmpty, Allow } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiModelProperty({ description: '分类名' })
  @IsNotEmpty()
  readonly name: string;

  @ApiModelProperty({ description: '是否启用' })
  @IsNotEmpty()
  readonly enabled: boolean;

  @ApiModelProperty({ required: false, description: '父级分类id' })
  @Allow()
  readonly parentId: number;
}
