import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { UserEntity } from './entity/user.entity';
import { Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.dto';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserEntity], { name: 'users' })
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Query(() => UserEntity, { name: 'me' })
  getUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.getUserById(id);
  }

  @Mutation(() => UserEntity)
  createUser(@Args('input') input: CreateUserInput) {
    return this.userService.createUser(input);
  }
}
