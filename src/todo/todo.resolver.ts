import {
  Args,
  Int,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { TodoEntity } from './entity/todo.entity';
import { Query } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { TodoDataStore } from './store/todo.store';
import { CreateTodoInput } from './dto/create-todo.dto';
import { UpdateTodoInput } from './dto/update-todo.dto';

@Resolver(() => TodoEntity)
export class TodoResolver {
  constructor(
    private readonly todoService: TodoService,
    private readonly userService: UserService,
  ) {}

  @Query(() => [TodoEntity], { name: 'todos' })
  getTodos() {
    return this.todoService.getTodos();
  }

  @Query(() => TodoEntity, { name: 'todo' })
  getTodoById(@Args('id') id: number) {
    return this.todoService.getTodoById(id);
  }

  @ResolveField(() => UserEntity, { name: 'assignee' })
  getAssignee(@Parent() parent: TodoDataStore) {
    return this.userService.getUserById(parent.assigneeId);
  }

  @Mutation(() => TodoEntity)
  createTodo(@Args('input') input: CreateTodoInput) {
    return this.todoService.createTodo(input);
  }

  @Mutation(() => TodoEntity)
  updateTodo(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateTodoInput,
  ) {
    return this.todoService.updateTodo(id, input);
  }

  @Mutation(() => TodoEntity)
  deleteTodo(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.deleteTodo(id);
  }
}
