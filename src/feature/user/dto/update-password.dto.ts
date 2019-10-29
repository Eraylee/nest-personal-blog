import { IsNotEmpty, IsDefined, Matches } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiModelProperty({ description: '用户原密码' })
  @IsDefined()
  @IsNotEmpty()
  readonly oldPassword: string;

  @ApiModelProperty({ description: '用户新密码' })
  @IsDefined()
  @Matches(/^[a-zA-Z0-9\-_]\w{5,19}$/, {
    message: '密码不合法',
  })
  readonly newPassword: string;
}
