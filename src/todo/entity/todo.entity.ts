import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Expose, Type } from 'class-transformer';
import { UserEntity } from 'src/user/entity/user.entity';

export enum TodoStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

registerEnumType(TodoStatus, {
  name: 'TodoStatus',
  description: 'The status of the todo task',
});

@ObjectType()
export class TodoEntity {
  @Field(() => ID)
  @Expose()
  id: string;

  @Field()
  @Expose()
  title: string;

  @Field(() => TodoStatus)
  @Expose()
  status: TodoStatus;

  @Field()
  @Expose()
  assignee: string;

  @Field()
  @Expose()
  assignedTo: string;
}
