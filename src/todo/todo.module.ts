import { Module } from '@nestjs/common';
import { TodoResolver } from './todo.resolver';
import { TodoService } from './todo.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [TodoResolver, TodoService],
})
export class TodoModule {}
