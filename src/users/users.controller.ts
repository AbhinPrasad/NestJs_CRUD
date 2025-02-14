import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserDto, ResponseJson, User } from 'src/utils/types';
import { users } from 'src/utils/data';
import { Response } from 'express';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService : UsersService){}

  @Get()
  getUsersList(@Query('searchTerm') searchTerm?: string): ResponseJson {
    let usersList: User[] = [];
    if (searchTerm) {
      usersList = users.filter((user) => {
        return (
          user.name.includes(searchTerm) ||
          user.age.toString().includes(searchTerm) ||
          user.job.includes(searchTerm)
        );
      });
    }
    return {
      success: true,
      message: 'User list retrieved successfully!',
      data: searchTerm ? usersList : users,
    };
  }

  @Get(':userId')
  getUserById(@Param('userId') userId: string, @Res() res: Response): void {
    const user = users.find((user) => user.id === parseInt(userId));
    if (!user) {
      res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        message: 'User not found!',
      });
    }
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'User retrieved successfully',
      data: user,
    });
  }

  @Post()
  addUser(@Body() user: UserDto): ResponseJson {
    const result = this.userService.insertUser(user)
    return {
      success: true,
      message: 'User created successfully!',
      data: result,
    };
  }

  @Patch(':userId')
  updateUserById(
    @Param('userId') userId: string,
    @Body() body: UserDto,
    @Res() res: Response,
  ): void {
    const id = parseInt(userId);
    const index = users.findIndex((user) => user.id === id);
    if (!index) {
      res
        .send(HttpStatus.BAD_REQUEST)
        .json({ success: false, message: 'User not found!' });
    }

    users[index] = { id, ...body };
    res.status(HttpStatus.OK).send({
      success: true,
      message: 'User updated successfully!',
      data: users[index],
    });
  }

  @Delete(':userId')
  deleteUserById(
    @Param('userId') userId: string,
    @Res({ passthrough: true }) res: Response,
  ): void {
    const user = users.findIndex((user) => user.id === parseInt(userId));
    if (!user) {
      res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        message: 'User not found!',
      });
    }
    users.splice(user, 1);
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'User removed successfully!',
      data: users,
    });
  }
}

/*
By using a library specific response object, this approach works and offers more flexibility 
by giving full control over the response object (such as header manipulation and access to 
library-specific features), it should be used with caution. Generally, this method is less 
clear and comes with some downsides. The main disadvantage is that your code becomes 
platform-dependent, as different underlying libraries may have different APIs for the response 
object. Additionally, it can make testing more challenging, as you'll need to mock the response 
object, among other things.

Furthermore, by using this approach, you lose compatibility with Nest features that rely on 
standard response handling, such as Interceptors and the @HttpCode() / @Header() decorators. 
To address this, you can enable the passthrough option like this:(refer delete API).

With this approach, you can interact with the native response object 
(for example, setting cookies or headers based on specific conditions), while still allowing 
the framework to handle the rest.
*/
