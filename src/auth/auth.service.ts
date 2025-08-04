import { UserService } from 'src/user/user.service';
import { RegisterUserInput } from './dto/register-input.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserResponse } from 'src/user/response/create-user.response';
import { LoginUserInput } from './dto/login-input.dto';
import { LoginResponse } from './response/login.response';
import { UserEntity } from 'src/user/entity/user.entity';
import { toUserEntity } from 'src/user/mapper/user.mapper';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.userService.findUserByEmail(email);

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      return toUserEntity(user);
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: UserEntity): Promise<LoginResponse> {
    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      username: user.username,
    });

    return {
      message: 'User logged in successfully',
      accessToken: accessToken,
    };
  }

  async register(input: RegisterUserInput): Promise<CreateUserResponse> {
    const hashedPassword = await bcrypt.hash(input.password, 10);
    input.password = hashedPassword;

    return this.userService.createUser(input);
  }
}
