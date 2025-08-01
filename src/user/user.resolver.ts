import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { UserEntity } from './entity/user.entity';
import { Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.dto';
import { IsObjectIdPipe } from '@nestjs/mongoose';
import { CreateUserResponse } from './response/create-user.response';
import { UpdateUserResponse } from './response/update-user.response';
import { UpdateUserInput } from './dto/update-user.dto';
import { DeleteUserResponse } from './response/delete-user.response';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserEntity], { name: 'users' })
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Query(() => UserEntity, { name: 'user' })
  getUser(@Args('id', IsObjectIdPipe) id: string) {
    return this.userService.getUserById(id);
  }

  @Mutation(() => CreateUserResponse)
  createUser(
    @Args('input') input: CreateUserInput,
  ): Promise<CreateUserResponse> {
    return this.userService.createUser(input);
  }

  @Mutation(() => UpdateUserResponse)
  updateUser(
    @Args('id', IsObjectIdPipe) id: string,
    @Args('input') input: UpdateUserInput,
  ): Promise<UpdateUserResponse> {
    return this.userService.updateUser(id, input);
  }

  @Mutation(() => DeleteUserResponse)
  deleteUser(@Args('id', IsObjectIdPipe) id: string) {
    return this.userService.deleteUser(id);
  }
}
