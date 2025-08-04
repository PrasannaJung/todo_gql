import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';

@InputType()
export class RegisterUserInput {
  @Field()
  @IsString()
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  username: string;

  @Field()
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;
}
