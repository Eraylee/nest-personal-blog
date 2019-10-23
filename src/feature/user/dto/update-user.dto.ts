import { IsNotEmpty, IsIn, IsByteLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiModelProperty({ description: '用户昵称' })
  @IsNotEmpty()
  readonly nickname: string;

  @ApiModelProperty({ description: '用户密码' })
  @IsByteLength(6, 18, {
    message: '密码长度不是6-18位',
  })
  readonly password: string;

  @ApiModelProperty({ description: '角色', enum: ['regular', 'admin'] })
  @IsIn(['regular', 'admin'])
  readonly role: string;
}
