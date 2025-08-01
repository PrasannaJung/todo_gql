import {
  Args,
  Int,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { TodoEntity } from './entity/todo.entity';
import { Query } from '@nestjs/graphql';
import { TODO_ADDED_EVENT, TodoService } from './todo.service';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { CreateTodoInput } from './dto/create-todo.dto';
import { UpdateTodoInput } from './dto/update-todo.dto';
import { CreateTodoResponse } from './response/create-todo.response';
import { Todo, TodoDocument } from './schema/todo.schema';

@Resolver(() => TodoEntity)
export class TodoResolver {
  constructor(
    private readonly todoService: TodoService,
    // private readonly userService: UserService,
  ) {}

  @Query(() => [TodoEntity], { name: 'todos' })
  getTodos(): Promise<TodoDocument[]> {
    return this.todoService.getAllTodos();
  }

  @Query(() => TodoEntity, { name: 'todo' })
  getTodoById(@Args('id') id: string): Promise<TodoDocument> {
    return this.todoService.getTodoById(id);
  }

  @Mutation(() => TodoEntity)
  async createTodo(
    @Args('input') input: CreateTodoInput,
  ): Promise<TodoDocument> {
    return await this.todoService.createTodo(input);
  }

  @Subscription(() => TodoEntity, {
    name: 'todoAdded',
    resolve: (payload) => {
      return payload.todoAdded;
    },
  })
  postAdded(): AsyncIterator<TodoEntity> {
    return this.todoService.getPubSub().asyncIterableIterator(TODO_ADDED_EVENT);
  }

  // @Query(() => [TodoEntity])
  // todosByUser(@Args('userId', { type: () => Int }) userId: number) {
  //   return this.todoService.getTodosByUser(userId);
  // }

  // @ResolveField(() => UserEntity, { name: 'assignee' })
  // getAssignee(@Parent() parent: TodoDataStore) {
  //   return this.userService.getUserById(parent.assigneeId);
  // }

  // @ResolveField(() => UserEntity, { name: 'assignedTo' })
  // getAssignedTo(@Parent() parent: TodoDataStore) {
  //   return this.userService.getUserById(parent.assignedToId);
  // }

  // @Mutation(() => TodoEntity)
  // updateTodo(
  //   @Args('id', { type: () => Int }) id: number,
  //   @Args('input') input: UpdateTodoInput,
  // ) {
  //   return this.todoService.updateTodo(id, input);
  // }

  // @Mutation(() => TodoEntity)
  // deleteTodo(@Args('id', { type: () => Int }) id: number) {
  //   return this.todoService.deleteTodo(id);
  // }

  // @Mutation(() => TodoEntity)
  // toggleComplete(@Args('id', { type: () => Int }) id: number) {
  //   return this.todoService.toggleComplete(id);
  // }
}
