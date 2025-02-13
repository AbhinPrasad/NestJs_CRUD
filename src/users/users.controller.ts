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
} from '@nestjs/common';
import { UserDto, ResponseJson, User } from 'src/utils/types';
import { users } from 'src/utils/data';
import { Response } from 'express';

@Controller('users')
export class UsersController {
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
    const newUser = { id: users.length + 1, ...user };
    users.push(newUser);
    return {
      success: true,
      message: 'User created successfully!',
      data: newUser,
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
}
