import { IsNotEmpty, Allow, IsDefined, IsBoolean } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiModelProperty({ required: false, description: '分类名' })
  @Allow()
  readonly name: string;

  @ApiModelProperty({ required: false, description: '分类标识' })
  @Allow()
  readonly code: string;

  @ApiModelProperty({ required: false, description: '是否启用' })
  @IsBoolean()
  readonly enabled: boolean;

  @ApiModelProperty({ required: false, description: '父级分类' })
  @Allow()
  readonly parent?: string;
}
