import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersoParamDto } from './dtos/get-users-param.dto';
import { PatchUsersDto } from './dtos/patch-users.dto';
import { UsersService } from './providers/users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    // Injecting UsersService
    private readonly usersService: UsersService,
  ) {}

  @Get('/:id?')
  @ApiOperation({
    summary: 'Get user with a specific ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Users fetched successfully based on query',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'the number of entries to be returned per query',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description: 'the position of page number to be returned',
    example: 1,
  })
  public getUsers(
    @Param() getUserParamDto: GetUsersoParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.usersService.findAll(getUserParamDto, limit, page);
  }

  @Post()
  public createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Patch()
  public patchUser(@Body() patchUserDto: PatchUsersDto) {
    return patchUserDto;
  }
}
