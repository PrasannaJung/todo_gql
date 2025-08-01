import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TodoStatus } from './entity/todo.entity';
import { CreateTodoInput } from './dto/create-todo.dto';
import { UpdateTodoInput } from './dto/update-todo.dto';
import { UserService } from 'src/user/user.service';
import { TodoRepositoryInterface } from './interface/todo-respository.interface';

import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from 'src/common/module/pub-sub.module';

export const TODO_ADDED_EVENT = 'todoAdded';

@Injectable()
export class TodoService {
  constructor(
    @Inject('TODO_REPO_TOKEN')
    private readonly todoRepository: TodoRepositoryInterface,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}

  async createTodo(input: CreateTodoInput) {
    const todo = await this.todoRepository.create(input);
    this.pubSub.publish(TODO_ADDED_EVENT, {
      todoAdded: todo.toObject(),
    });
    return todo;
  }

  async getAllTodos() {
    return await this.todoRepository.findAll();
  }

  async getTodoById(id: string) {
    const todo = await this.todoRepository.findById(id);
    if (!todo) {
      throw new NotFoundException('Todo with the given id not found');
    }

    return todo;
  }

  getPubSub(): PubSub {
    return this.pubSub;
  }
}
