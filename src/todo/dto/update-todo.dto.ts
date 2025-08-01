import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { TodoStatus } from '../entity/todo.entity';

@InputType()
export class UpdateTodoInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MinLength(5, { message: 'Title must be at least 5 characters long!' })
  title?: string;

  @Field(() => TodoStatus, { nullable: true })
  @IsEnum(TodoStatus, { message: 'Status must be either active or completed!' })
  @IsOptional()
  status?: TodoStatus;
}
