import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResponse } from 'src/common/response/base.response';
import { TodoEntity } from '../entity/todo.entity';

@ObjectType()
export class UpdateTodoResponse extends BaseResponse {
  @Field(() => TodoEntity)
  todo: TodoEntity;
}
