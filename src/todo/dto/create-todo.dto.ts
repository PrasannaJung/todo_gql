import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateTodoInput {
  @Field()
  @IsString()
  @MinLength(5, { message: 'Title must be at least 5 characters' })
  title: string;

  @Field()
  @IsMongoId({ message: 'Assignee must be a valid Mongo ID' })
  assignee: string;

  @Field()
  @IsMongoId({ message: 'AssignedTo must be a valid Mongo ID' })
  assignedTo: string;
}
