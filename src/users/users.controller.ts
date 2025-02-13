import { Controller, Get } from '@nestjs/common';
import { ResponseJson } from 'src/utils/types';
import { users } from 'src/utils/data';

@Controller('users')
export class UsersController {
  @Get()
  getUsersList(): ResponseJson {
    return {
      success: true,
      message: 'User list retrieved successfully!',
      data: users,
    };
  }
}
