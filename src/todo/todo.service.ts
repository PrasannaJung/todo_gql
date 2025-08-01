import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoInput } from './dto/create-todo.dto';
import { TodoRepositoryInterface } from './interface/todo-respository.interface';

import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from 'src/common/module/pub-sub.module';
import { toTodoEntity } from './mapper/todo.mapper';
import { CreateTodoResponse } from './response/create-todo.response';
import { PaginationInputArgs } from 'src/common/dto/pagination-input';
import { TodoPaginationResponse } from './response/todo-pagination.response';
import { UpdateTodoInput } from './dto/update-todo.dto';
import { UpdateTodoResponse } from './response/update-todo.response';
import { UserService } from 'src/user/user.service';
import { DeleteTodoResponse } from './response/delete-todo.response';

export const TODO_ADDED_EVENT = 'todoAdded';

@Injectable()
export class TodoService {
  constructor(
    @Inject('TODO_REPO_TOKEN')
    private readonly todoRepository: TodoRepositoryInterface,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
    private readonly userService: UserService,
  ) {}

  async createTodo(input: CreateTodoInput): Promise<CreateTodoResponse> {
    const assignedTo = await this.userService.getUserById(input.assignedToId);
    if (!assignedTo) {
      throw new NotFoundException('Assigned user not found');
    }

    const todo = await this.todoRepository.create(input);

    this.pubSub.publish(TODO_ADDED_EVENT, {
      todoAdded: todo.toObject(),
    });

    const todoEntityType = toTodoEntity(todo);

    return {
      message: 'Todo created successfully',
      todo: todoEntityType,
    };
  }

  async getAllTodos() {
    return await this.todoRepository.findAll();
  }

  async getPaginatedTodos(
    args: PaginationInputArgs,
  ): Promise<TodoPaginationResponse> {
    return await this.todoRepository.findPaginatedData(args);
  }

  async getTodoById(id: string) {
    const todo = await this.todoRepository.findById(id);
    if (!todo) {
      throw new NotFoundException('Todo with the given id not found');
    }

    return todo;
  }

  async updateTodo(
    id: string,
    input: UpdateTodoInput,
  ): Promise<UpdateTodoResponse> {
    const updatedTodo = await this.todoRepository.update(id, input);
    if (!updatedTodo) {
      throw new NotFoundException('Todo with the given id not found');
    }

    return {
      message: 'Todo updated successfully',
      todo: toTodoEntity(updatedTodo),
    };
  }

  async deleteTodo(id: string): Promise<DeleteTodoResponse> {
    const deletedTodo = await this.todoRepository.deleteById(id);
    if (!deletedTodo) {
      throw new NotFoundException('Todo with the given id not found');
    }

    return {
      message: 'Todo deleted successfully',
      todo: toTodoEntity(deletedTodo),
    };
  }
}
