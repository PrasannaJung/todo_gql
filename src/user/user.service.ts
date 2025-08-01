import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.dto';
import { TodoService } from 'src/todo/todo.service';
import { UserRepository } from './user.repository';
import { UserDocument } from './schema/user.schema';
import { UserRepositoryInterface } from './interface/user-repository.interface';
import { CreateUserResponse } from './response/create-user.response';
import { toUserEntity } from './mapper/user.mapper';
import { UpdateUserInput } from './dto/update-user.dto';
import { UpdateUserResponse } from './response/update-user.response';
import { DeleteUserResponse } from './response/delete-user.response';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => TodoService))
    private readonly todoService: TodoService,

    @Inject('USER_REPO_TOKEN')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async createUser(input: CreateUserInput): Promise<CreateUserResponse> {
    const existingUser = await this.userRepository.findByEmail(input.email);

    if (existingUser) {
      throw new NotFoundException('User with this email already exists');
    }

    const user = await this.userRepository.create(input);

    return {
      message: 'User created successfully',
      user: toUserEntity(user),
    };
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

  async updateUser(
    id: string,
    input: UpdateUserInput,
  ): Promise<UpdateUserResponse> {
    const updatedUser = await this.userRepository.update(id, input);
    if (!updatedUser) {
      throw new NotFoundException('User with the given id not found');
    }

    return {
      message: 'User updated successfully',
      user: toUserEntity(updatedUser),
    };
  }

  async deleteUser(id: string): Promise<DeleteUserResponse> {
    const user = await this.userRepository.deleteById(id);
    if (!user) {
      throw new NotFoundException('User with the given id not found');
    }

    await this.todoService.deleteTodosByUser(id);

    return {
      message: 'User deleted successfully',
      user: toUserEntity(user),
    };
  }
}
