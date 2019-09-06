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
} from './dto/index.dto';
import { UserService } from './user.service';
import { RolesGuard } from '../../common/guards/role.guard';
import { Roles } from '../../common/decorators/roles.decorator';
@ApiBearerAuth()
@ApiUseTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 查询用户
   * @param query
   * @return Promise<Result>
   */
  @ApiOperation({ title: '查询用户' })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get()
  async find(@Query() query: QueryUserDto) {
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
  @Post()
  async create(@Body() user: CreateUserDto): Promise<Result> {
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
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
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
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Put('info')
  async modifyInfo(@Body() user: UpdateUserDto): Promise<Result> {
    return {
      code: 200,
      message: '修改成功',
      data: await this.userService.modifyInfo(user),
    };
  }
}
