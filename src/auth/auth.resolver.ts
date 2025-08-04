import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterUserInput } from './dto/register-input.dto';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => String)
  async register(@Args('input') input: RegisterUserInput): Promise<string> {
    await this.authService.register(input);
    return 'User registered successfully';
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard) // uses 'local' strategy
  async login(@CurrentUser() user: any): Promise<string> {
    const { accessToken } = await this.authService.login(user);
    return accessToken;
  }
}
