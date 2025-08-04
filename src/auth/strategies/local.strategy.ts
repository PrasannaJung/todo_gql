import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserEntity } from 'src/user/entity/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  /*
    Who calls this method?
    This method is called by Passport when a user tries to log in using the local strategy.
    By default, Passport extracts the 'username' and 'password' from the request body. We call the super constructor with `usernameField: 'email'` to tell Passport to use 'email' field from the request object instead of 'username'.
  */
  async validate(email: string, password: string): Promise<UserEntity> {
    console.log(
      'STRATEGY VALIDATE FUNCTION CALLED WITH EMAIL:',
      email,
      'AND PASSWORD:',
      password,
    );
    const user = await this.authService.validateUser(email, password);
    return user; // this will automatically be added to the request object as req.user by Passport
  }
}
