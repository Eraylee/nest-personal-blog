import { IsNotEmpty, IsBoolean, IsDefined, Allow } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiModelProperty({ description: '分类名' })
  @IsDefined()
  @IsNotEmpty()
  readonly name: string;

  @ApiModelProperty({ description: '分类标识' })
  @IsDefined()
  @IsNotEmpty()
  readonly code: string;

  @ApiModelProperty({ description: '是否启用' })
  @IsDefined()
  @IsBoolean()
  readonly enabled: boolean;

  @ApiModelProperty({ required: false, description: '父级分类' })
  @Allow()
  readonly parent?: string;
}
