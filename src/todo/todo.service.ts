import { Injectable, NotFoundException } from '@nestjs/common';
import { todos as TODOS_DATA } from './store/todo.store';
import { TodoStatus } from './entity/todo.entity';
import { CreateTodoInput } from './dto/create-todo.dto';
import { UpdateTodoInput } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  private todos = TODOS_DATA;

  getTodos() {
    return this.todos;
  }

  getTodoById(id: number) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new NotFoundException('Todo with the given id not found');
    }
    return todo;
  }

  createTodo(input: CreateTodoInput) {
    const newTodo = {
      id: this.todos.length + 1,
      ...input,
      status: TodoStatus.ACTIVE,
    };

    this.todos.push(newTodo);

    return newTodo;
  }

  updateTodo(id: number, input: UpdateTodoInput) {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      throw new NotFoundException('Todo with the given id not found');
    }

    const todo = this.todos[todoIndex];
    const updatedTodo = { ...todo, ...input };
    this.todos[todoIndex] = updatedTodo;

    return updatedTodo;
  }

  deleteTodo(id: number) {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      throw new NotFoundException('Todod not found');
    }

    const deletedTodo = this.todos[todoIndex];
    const newTodos = this.todos.filter((todo) => todo.id !== id);

    this.todos = newTodos;

    return deletedTodo;
  }
}
