import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { users as USERS_DATA } from './store/user.store';
import { CreateUserInput } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private readonly users: UserEntity[] = USERS_DATA;

  createUser(input: CreateUserInput) {
    const newUser = { id: this.users.length + 1, ...input };
    this.users.push(newUser);
    return newUser;
  }

  getAllUsers() {
    return this.users;
  }

  getUserById(id: number): UserEntity {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
