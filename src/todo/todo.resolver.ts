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
import { TodoPaginationResponse } from './response/todo-pagination.response';
import { PaginationInputArgs } from 'src/common/dto/pagination-input';
import { Inject } from '@nestjs/common';
import { PUB_SUB } from 'src/common/module/pub-sub.module';
import { PubSub } from 'graphql-subscriptions';
import { UpdateTodoResponse } from './response/update-todo.response';
import { IsObjectIdPipe } from '@nestjs/mongoose';

@Resolver(() => TodoEntity)
export class TodoResolver {
  constructor(
    private readonly todoService: TodoService,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,

    // private readonly userService: UserService,
  ) {}

  @Query(() => TodoPaginationResponse, { name: 'todos' })
  getTodos(
    @Args() paginationArgs: PaginationInputArgs,
  ): Promise<TodoPaginationResponse> {
    return this.todoService.getPaginatedTodos(paginationArgs);
  }

  @Query(() => [TodoEntity], { name: 'allTodos' })
  getAllTodos(): Promise<TodoDocument[]> {
    return this.todoService.getAllTodos();
  }

  @Query(() => TodoEntity, { name: 'todo' })
  getTodoById(@Args('id') id: string): Promise<TodoDocument> {
    return this.todoService.getTodoById(id);
  }

  @Mutation(() => CreateTodoResponse)
  async createTodo(
    @Args('input') input: CreateTodoInput,
  ): Promise<CreateTodoResponse> {
    return this.todoService.createTodo(input);
  }

  @Mutation(() => UpdateTodoResponse)
  async updateTodo(
    @Args('id', IsObjectIdPipe) id: string,
    @Args('input') input: UpdateTodoInput,
  ): Promise<UpdateTodoResponse> {
    return this.todoService.updateTodo(id, input);
  }

  @Subscription(() => TodoEntity, {
    name: 'todoAdded',
    resolve: (payload) => {
      return payload.todoAdded;
    },
  })
  postAdded(): AsyncIterator<TodoEntity> {
    return this.pubSub.asyncIterableIterator(TODO_ADDED_EVENT);
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
