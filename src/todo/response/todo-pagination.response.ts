import { ObjectType } from '@nestjs/graphql';
import { TodoEntity } from '../entity/todo.entity';
import { createPaginatedResponse } from 'src/common/response/pagination.response';

@ObjectType()
export class TodoPaginationResponse extends createPaginatedResponse(
  TodoEntity,
) {}
