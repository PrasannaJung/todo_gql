import { forwardRef, Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { TodoModule } from 'src/todo/todo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => TodoModule),
  ],
  providers: [
    UserResolver,
    UserService,
    {
      provide: 'USER_REPO_TOKEN',
      useClass: UserRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
