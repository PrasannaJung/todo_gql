import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.dto';
import { TodoService } from 'src/todo/todo.service';
import { UserRepository } from './user.repository';
import { UserDocument } from './schema/user.schema';
import { UserRepositoryInterface } from './interface/user-repository.interface';

@Injectable()
export class UserService {
  constructor(
    // private readonly todoService: TodoService,
    @Inject('USER_REPO_TOKEN')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async createUser(input: CreateUserInput): Promise<UserDocument> {
    const existingUser = await this.userRepository.findByEmail(input.email);

    if (existingUser) {
      throw new NotFoundException('User with this email already exists');
    }

    return await this.userRepository.create(input);
  }

  async getAllUsers(): Promise<UserDocument[]> {
    return await this.userRepository.findAll();
  }

  async getUserById(id: string): Promise<UserDocument> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User with the given id not found');
    }
    return user;
  }

  // async deleteUser(id: string): Promise<UserDocument> {
  //   const user = await this.userRepository.findById(id);
  //   if (!user) {
  //     throw new NotFoundException('User with the given id not found');
  //   }

  //   await this.todoService.deleteTodosMyUser(id);
  //   return await this.userRepository.deleteById(id);
  // }
}
