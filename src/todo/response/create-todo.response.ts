import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResponse } from 'src/common/interface/base-response.interface';
import { TodoEntity } from '../entity/todo.entity';

@ObjectType()
export class CreateTodoResponse extends BaseResponse {
  @Field(() => TodoEntity)
  todo: TodoEntity;
}
