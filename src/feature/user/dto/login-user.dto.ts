import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiModelProperty({ description: '用户名' })
  @IsNotEmpty()
  readonly username: string;

  @ApiModelProperty({ description: '用户密码' })
  @IsNotEmpty()
  readonly password: string;
}
