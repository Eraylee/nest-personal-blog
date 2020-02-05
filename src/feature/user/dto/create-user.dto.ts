/*
 * @Author: ERAYLEE
 * @Date: 2019-09-06 21:06:33
 * @LastEditors  : ERAYLEE
 * @LastEditTime : 2020-02-05 16:03:21
 */
import { IsNotEmpty, Matches, IsIn, IsDefined } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { UserEntity } from '../user.entity';

export class CreateUserDto implements Partial<UserEntity> {
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
  @Matches(/^[a-zA-Z0-9\-_]\w{5,19}$/, {
    message: '密码不合法',
  })
  readonly password: string;

  @ApiModelProperty({ description: '角色', enum: ['regular', 'admin'] })
  @IsDefined()
  @IsIn(['regular', 'admin'])
  readonly role: string;
}
