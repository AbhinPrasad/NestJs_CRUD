import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common';
import { ResponseJson, User } from 'src/utils/types';
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
    console.log('userId', userId);
    const user = users.find((user) => user.id === parseInt(userId));
    console.log('user', user);
    if (!user) {
      res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        message: 'User not found!',
      });
    }
    res.status(HttpStatus.OK).send({
      success: true,
      message: 'User retrieved successfully',
      data: user,
    });
  }
}
