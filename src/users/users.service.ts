import { Injectable } from '@nestjs/common';
import { User } from 'src/utils/types';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  insertUser(user: User){
    const newUser = {id: this.users.length + 1, ...user}
    this.users.push(newUser);
    return newUser;
  }
}
