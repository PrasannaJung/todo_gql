import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { UserEntity } from './entity/user.entity';
import { Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.dto';
import { IsObjectIdPipe } from '@nestjs/mongoose';

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

  @Mutation(() => UserEntity)
  createUser(@Args('input') input: CreateUserInput) {
    return this.userService.createUser(input);
  }

  // @Mutation(() => UserEntity)
  // deleteUser(@Args('id', { type: () => Int }) id: number) {
  //   return this.userService.deleteUser(id);
  // }
}
