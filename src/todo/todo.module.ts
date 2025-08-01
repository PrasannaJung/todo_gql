import { Module } from '@nestjs/common';
import { TodoResolver } from './todo.resolver';
import { TodoService } from './todo.service';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './schema/todo.schema';
import { TodoRepository } from './todo.repository';
import { PubSubModule } from 'src/common/module/pub-sub.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
    UserModule,
    PubSubModule,
  ],
  providers: [
    TodoResolver,
    TodoService,
    {
      provide: 'TODO_REPO_TOKEN',
      useClass: TodoRepository,
    },
  ],
  exports: [TodoService],
})
export class TodoModule {}
