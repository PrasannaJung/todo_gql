import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterUserInput } from './dto/register-input.dto';
import { GqlLocalAuthGuard } from './guards/gql-local-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CreateUserResponse } from 'src/user/response/create-user.response';
import { LoginUserInput } from './dto/login-input.dto';
import { UserEntity } from 'src/user/entity/user.entity';
import { LoginResponse } from './response/login.response';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => CreateUserResponse)
  async register(
    @Args('input') input: RegisterUserInput,
  ): Promise<CreateUserResponse> {
    return await this.authService.register(input);
  }

  @Mutation(() => LoginResponse)
  @UseGuards(GqlLocalAuthGuard)
  async login(
    @Args('input') input: LoginUserInput,
    @CurrentUser() user: UserEntity,
  ): Promise<LoginResponse> {
    return await this.authService.login(user);
  }
}
