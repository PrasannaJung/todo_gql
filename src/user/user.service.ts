import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { users as USERS_DATA } from './store/user.store';

export class UserService {
  private readonly users: UserEntity[] = USERS_DATA;

  getUserById(id: number): UserEntity {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
