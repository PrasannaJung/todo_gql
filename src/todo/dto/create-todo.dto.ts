import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsPositive, IsString } from 'class-validator';

@InputType()
export class CreateTodoInput {
  @Field()
  @IsString()
  title: string;

  @Field()
  @IsNumber()
  assigneeId: number;

  @Field()
  @IsNumber()
  @IsPositive()
  assignedToId: number;
}
