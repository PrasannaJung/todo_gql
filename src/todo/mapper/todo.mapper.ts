import { plainToInstance } from 'class-transformer';
import { TodoEntity } from '../entity/todo.entity';
import { TodoDocument } from '../schema/todo.schema';

export const toTodoEntity = (data: TodoDocument): TodoEntity => {
  return plainToInstance(TodoEntity, data);
};

export const toTodoEntityList = (data: TodoDocument[]): TodoEntity[] => {
  return data.map(toTodoEntity);
};
