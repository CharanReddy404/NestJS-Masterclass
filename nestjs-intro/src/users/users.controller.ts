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

@Controller('users')
export class UsersController {
  @Get('/:id?')
  public getUsers(
    @Param() getUserParamDto: GetUsersoParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    console.log(getUserParamDto);
    console.log(limit);
    console.log(page);
    return 'you send a GET request to users endpoint';
  }

  @Post()
  public createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return 'you send a POST request to users endpoint';
  }

  @Patch()
  public patchUser(@Body() patchUserDto: PatchUsersDto) {
    return patchUserDto;
  }
}
