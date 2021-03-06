/*
 * @Author: ERAYLEE
 * @Date: 2019-09-06 21:06:33
 * @LastEditors: ERAYLEE
 * @LastEditTime: 2020-04-17 17:51:12
 */
import { Post, Body, Put, Param, Controller, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto, LoginUserDto, UpdatePasswordDto } from './dto';
import { UserService } from './user.service';
import { RolesGuard, AuthGuard } from '../../common/guards';
import { Roles } from '../../common/decorators';
import { BaseController } from '../../common/base';
import { UserEntity } from './user.entity';

@ApiBearerAuth()
@ApiUseTags('user')
@Controller('user')
export class UserController extends BaseController<UserEntity> {
  constructor(private readonly service: UserService) {
    super(service);
  }

  /**
   * 用户登录
   * @param user
   * @return Promise<Result>
   */
  @ApiOperation({ title: '用户登录' })
  @Post('login')
  async login(@Body() user: LoginUserDto) {
    return {
      code: 200,
      message: '登录成功',
      data: await this.service.login(user),
    };
  }
  /**
   * 新增用户
   * @param username
   * @return Promise<Result>
   */
  @ApiOperation({ title: '新增用户' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  async create(@Body() user: CreateUserDto) {
    return {
      code: 200,
      message: '新增成功',
      data: await this.service.createUser(user),
    };
  }
  /**
   * 修改用户密码
   * @param user
   * @return Promise<Result>
   */
  @ApiOperation({ title: '修改密码' })
  @UseGuards(AuthGuard)
  @Put(':id/password')
  async updatePassword(
    @Param('id') id: string,
    @Body() user: UpdatePasswordDto,
  ) {
    return {
      code: 200,
      message: '修改成功',
      data: await this.service.updatePassword(id, user),
    };
  }
  /**
   * 重置用户密码
   * @param user
   * @return Promise<Result>
   */
  @ApiOperation({ title: '重置密码' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id/resetPassword')
  async resetPassword(@Param('id') id: string) {
    return {
      code: 200,
      message: '修改成功',
      data: await this.service.resetPassword(id),
    };
  }
}
