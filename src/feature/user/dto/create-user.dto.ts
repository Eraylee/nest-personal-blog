import {
  IsNotEmpty,
  MinLength,
  Matches,
  IsByteLength,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiModelProperty({ description: '用户名' })
  @Transform(value => value.toLowerCase(), { toClassOnly: true })
  @MinLength(5, {
    message: '用户名至少需要5个字符',
  })
  @MaxLength(11, {
    message: '用户名至少需要11个字符',
  })
  @Matches(/^[a-zA-Z0-9\-_]\w{4,20}$/, {
    message: '用户名不合法',
  })
  readonly username: string;

  @ApiModelProperty({ description: '用户昵称' })
  @IsNotEmpty()
  readonly nickname: string;

  @ApiModelProperty({ description: '用户密码' })
  @IsByteLength(6, 18, {
    message: '密码长度不是6-18位',
  })
  readonly password: string;
}
