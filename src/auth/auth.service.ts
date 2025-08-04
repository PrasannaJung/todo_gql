import { UserService } from 'src/user/user.service';
import { RegisterUserInput } from './dto/register-input.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user.toObject();
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any) {
    const payload = { sub: user._id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(input: RegisterUserInput) {
    const existing = await this.userService.findUserByEmail(input.email);
    if (existing) throw new Error('Email already registered');
    return this.userService.createUser(input);
  }
}
