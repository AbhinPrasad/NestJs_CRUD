import { Injectable } from '@nestjs/common';
import { User } from 'src/utils/types';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  insertUser(user: User) {
    const newUser = { id: this.users.length + 1, ...user };
    this.users.push(newUser);
    return newUser;
  }

  getAllUsers(searchTerm: string | null) {
    if (searchTerm) {
      return this.users.filter((user) => {
        return (
          user.name.includes(searchTerm) ||
          user.age.toString().includes(searchTerm) ||
          user.job.includes(searchTerm)
        );
      });
    }
    return this.users;
  }

  getUserById(id: number) {
    const user = this.users.find((user) => user.id === id);
    return user ? user : null;
  }
}
