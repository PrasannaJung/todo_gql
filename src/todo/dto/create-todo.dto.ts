import { Field, InputType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class CreateTodoInput {
  @Field()
  @IsString()
  @MinLength(5, { message: 'Title must be at least 5 characters' })
  title: string;

  @Field()
  @IsString()
  assigneeId: string;

  @Field()
  @IsString()
  assignedToId: string;
}
