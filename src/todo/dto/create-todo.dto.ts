import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateTodoInput {
  @Field()
  @IsString()
  @MinLength(5, { message: 'Title must be at least 5 characters' })
  title: string;

  @Field()
  @IsMongoId({ message: 'assigneeId must be a valid Mongo ID' })
  assigneeId: string;

  @Field()
  @IsMongoId({ message: 'assignedToId must be a valid Mongo ID' })
  assignedToId: string;
}
