import {
  Args,
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
import { CreateTodoInput } from './dto/create-todo.dto';
import { UpdateTodoInput } from './dto/update-todo.dto';
import { CreateTodoResponse } from './response/create-todo.response';
import { TodoPaginationResponse } from './response/todo-pagination.response';
import { PaginationInputArgs } from 'src/common/dto/pagination-input';
import { Inject, UseGuards } from '@nestjs/common';
import { PUB_SUB } from 'src/common/module/pub-sub.module';
import { PubSub } from 'graphql-subscriptions';
import { UpdateTodoResponse } from './response/update-todo.response';
import { IsObjectIdPipe } from '@nestjs/mongoose';
import { GqlJwtAuthGuard } from 'src/auth/guards/gql-jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from '../common/interface/jwt-payload.interface';
import { DeleteTodoResponse } from './response/delete-todo.response';

@Resolver(() => TodoEntity)
export class TodoResolver {
  constructor(
    private readonly todoService: TodoService,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}

  @Query(() => TodoPaginationResponse, { name: 'todos' })
  getTodos(
    @Args() paginationArgs: PaginationInputArgs,
  ): Promise<TodoPaginationResponse> {
    return this.todoService.getPaginatedTodos(paginationArgs);
  }

  @Query(() => [TodoEntity], { name: 'allTodos' })
  getAllTodos(): Promise<TodoEntity[]> {
    return this.todoService.getAllTodos();
  }

  @Query(() => TodoEntity, { name: 'todo' })
  getTodoById(@Args('id') id: string): Promise<TodoEntity> {
    return this.todoService.getTodoById(id);
  }

  @Mutation(() => CreateTodoResponse)
  @UseGuards(GqlJwtAuthGuard)
  async createTodo(
    @Args('input') input: CreateTodoInput,
    @CurrentUser() user: JwtPayload,
  ): Promise<CreateTodoResponse> {
    return this.todoService.createTodo(input, user.sub);
  }

  @Mutation(() => UpdateTodoResponse)
  @UseGuards(GqlJwtAuthGuard)
  async updateTodo(
    @Args('id', IsObjectIdPipe) id: string,
    @Args('input') input: UpdateTodoInput,
    @CurrentUser() user: JwtPayload,
  ): Promise<UpdateTodoResponse> {
    return this.todoService.updateTodo(id, input, user.sub);
  }

  @Mutation(() => DeleteTodoResponse)
  async deleteTodo(
    @Args('id', IsObjectIdPipe) id: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.todoService.deleteTodo(id, user.sub);
  }

  @ResolveField(() => UserEntity, { name: 'user' })
  getAssigndToUser(@Parent() parent: TodoEntity): Promise<UserEntity> {
    return this.todoService.getTodoUser(parent.user);
  }

  @Query(() => TodoPaginationResponse, { name: 'myTodos' })
  @UseGuards(GqlJwtAuthGuard)
  todosByUser(
    @CurrentUser() user: JwtPayload,
    @Args() paginationArgs: PaginationInputArgs,
  ): Promise<TodoPaginationResponse> {
    return this.todoService.getTodosByUser(user.sub, paginationArgs);
  }

  @Subscription(() => TodoEntity, {
    name: 'todoUpdated',
    resolve: (payload) => {
      return payload.todoUpdated;
    },
  })
  todoUpdated(): AsyncIterator<TodoEntity> {
    return this.pubSub.asyncIterableIterator('todoUpdated');
  }

  @Subscription(() => TodoEntity, {
    name: 'todoAdded',
    filter: (payload, _, context) => {
      console.log('User in subscription context:', context.user);

      const user = context.user;
      if (payload.todoAdded.user.toString() !== user.sub) {
        return false;
      }
      return true;
    },
    resolve: (payload, _, context) => {
      console.log('User in subscription context:', context.user);
      return payload.todoAdded;
    },
  })
  postAdded(): AsyncIterator<TodoEntity> {
    return this.pubSub.asyncIterableIterator(TODO_ADDED_EVENT);
  }
}
