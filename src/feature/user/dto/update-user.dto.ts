import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiModelProperty({ description: '用户id' })
  @IsNotEmpty()
  readonly id: number;

  @ApiModelProperty({ description: '用户密码' })
  @IsNotEmpty()
  readonly password: string;

  @ApiModelProperty({ description: '用户昵称' })
  @IsNotEmpty()
  readonly nickname: string;
}
