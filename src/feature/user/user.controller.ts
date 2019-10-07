import {
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Controller,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Result } from '../../common/interfaces';
import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import {
  CreateUserDto,
  QueryUserDto,
  LoginUserDto,
  UpdateUserDto,
} from './dto';

import { UserService } from './user.service';
import { RolesGuard, AuthGuard } from '../../common/guards';
import { Roles } from '../../common/decorators';

@ApiBearerAuth()
@ApiUseTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  /**
   * 通过id查询用户
   * @param query
   * @return Promise<Result>
   */
  @ApiOperation({ title: '通过id查询用户' })
  @UseGuards(AuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return {
      code: 200,
      message: '查询成功',
      data: await this.userService.findById(id),
    };
  }
  /**
   * 查询用户
   * @param query
   * @return Promise<Result>
   */
  @ApiOperation({ title: '查询用户' })
  @Get()
  async getUsers(@Query() query: QueryUserDto) {
    return {
      code: 200,
      message: '查询成功',
      data: await this.userService.find(query),
    };
  }
  /**
   * 用户登录
   * @param user
   * @return Promise<Result>
   */
  @ApiOperation({ title: '用户登录' })
  @Post('login')
  async login(@Body() user: LoginUserDto): Promise<Result> {
    return {
      code: 200,
      message: '登录成功',
      data: await this.userService.login(user),
    };
  }

  /**
   * 新增用户
   * @param username
   * @return Promise<Result>
   */
  @ApiOperation({ title: '新增用户' })
  @UseGuards(RolesGuard, AuthGuard)
  @Roles('admin')
  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<Result> {
    return {
      code: 200,
      message: '新增成功',
      data: await this.userService.create(user),
    };
  }

  /**
   * 删除用户
   * @param id
   * @return Promise<Result>
   */
  @ApiOperation({ title: '删除用户' })
  @UseGuards(RolesGuard, AuthGuard)
  @Roles('admin')
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return {
      code: 200,
      message: '删除成功',
      data: await this.userService.delete(id),
    };
  }

  /**
   * 修改用户
   * @param user
   * @return Promise<Result>
   */
  @ApiOperation({ title: '修改用户' })
  @UseGuards(RolesGuard, AuthGuard)
  @Roles('admin')
  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() user: UpdateUserDto,
  ): Promise<Result> {
    return {
      code: 200,
      message: '修改成功',
      data: await this.userService.update(id, user),
    };
  }
}
