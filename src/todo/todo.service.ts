import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TodoStatus } from './entity/todo.entity';
import { CreateTodoInput } from './dto/create-todo.dto';
import { UpdateTodoInput } from './dto/update-todo.dto';
import { UserService } from 'src/user/user.service';
import { TodoRepositoryInterface } from './interface/todo-respository.interface';

@Injectable()
export class TodoService {
  constructor(
    @Inject('TODO_REPO_TOKEN')
    private readonly todoRepository: TodoRepositoryInterface,
  ) {}

  async createTodo(input: CreateTodoInput) {
    const todo = await this.todoRepository.create(input);

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
}
