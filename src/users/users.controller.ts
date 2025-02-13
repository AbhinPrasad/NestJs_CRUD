import { Controller, Get, Query } from '@nestjs/common';
import { ResponseJson, User } from 'src/utils/types';
import { users } from 'src/utils/data';

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
}
