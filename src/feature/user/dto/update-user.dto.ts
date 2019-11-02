import { IsNotEmpty, IsIn, IsByteLength, IsDefined } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiModelProperty({ description: '用户昵称' })
  @IsDefined()
  @IsNotEmpty()
  readonly nickname: string;

  @ApiModelProperty({ description: '角色', enum: ['regular', 'admin'] })
  @IsIn(['regular', 'admin'])
  readonly role: string;
}
