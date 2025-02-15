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
  HttpException,
  ForbiddenException,
} from '@nestjs/common';
import { UserDto, ResponseJson } from 'src/utils/types';
import { Response } from 'express';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsersList(@Query('searchTerm') searchTerm?: string): ResponseJson {
    // throw new ForbiddenException();  ---> Custom Exceptions
    /* 
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN); ---> Exception Filter
      By default, the JSON response body contains two properties:
       - statusCode: defaults to the HTTP status code provided in the status argument
       - message: a short description of the HTTP error based on the status
    */
    try {
      const query = searchTerm ?? null;
      const result = this.userService.getAllUsers(query);
      return {
        success: true,
        message: 'User list retrieved successfully!',
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
      /*
      To override the entire JSON response body, pass an object in the response argument. 
      Nest will serialize the object and return it as the JSON response body.

      There is a third constructor argument (optional) - options - that can be used 
      to provide an error cause. This cause object is not serialized into the response object, 
      but it can be useful for logging purposes, providing valuable information about 
      the inner error that caused the HttpException to be thrown
      */
    }
  }

  @Get(':userId')
  getUserById(@Param('userId') userId: string, @Res() res: Response): void {
    const id = parseInt(userId);
    const result = this.userService.getUserById(id);

    if (!result) {
      res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        message: 'User not found!',
      });
      return;
    }
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'User retrieved successfully',
      data: result,
    });
  }

  @Post()
  addUser(@Body() user: UserDto): ResponseJson {
    const result = this.userService.insertUser(user);
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
    const result = this.userService.updateUser(body, id);
    if (!result) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ success: false, message: 'User not found!' });
      return;
    }
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  }

  @Delete(':userId')
  deleteUserById(
    @Param('userId') userId: string,
    @Res({ passthrough: true }) res: Response,
  ): void {
    const id = parseInt(userId);
    const result = this.userService.deleteUser(id);
    if (!result) {
      res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        message: 'User not found!',
      });
    }

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'User removed successfully!',
      data: result,
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
