import { IsNotEmpty, IsDefined } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiModelProperty({ description: '用户名' })
  @IsDefined()
  @IsNotEmpty()
  readonly username: string;

  @ApiModelProperty({ description: '用户密码' })
  @IsDefined()
  @IsNotEmpty()
  readonly password: string;
}
