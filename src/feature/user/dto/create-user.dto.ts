import {
  IsNotEmpty,
  Matches,
  IsIn,
  IsDefined,
  IsByteLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiModelProperty({ description: '用户名' })
  @IsDefined()
  @Transform(value => value.toLowerCase(), { toClassOnly: true })
  @Matches(/^[a-zA-Z0-9\-_]\w{4,16}$/, {
    message: '用户名不合法',
  })
  readonly username: string;

  @ApiModelProperty({ description: '用户昵称' })
  @IsDefined()
  @IsNotEmpty()
  readonly nickname: string;

  @ApiModelProperty({ description: '用户密码' })
  @IsDefined()
  @IsByteLength(6, 18, {
    message: '密码长度不是6-18位',
  })
  readonly password: string;

  @ApiModelProperty({ description: '角色', enum: ['regular', 'admin'] })
  @IsDefined()
  @IsIn(['regular', 'admin'])
  readonly role: string;
}
