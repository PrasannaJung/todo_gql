import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
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
  id: number;

  @Field()
  title: string;

  @Field(() => TodoStatus)
  status: TodoStatus;

  @Field(() => UserEntity)
  assignee: UserEntity;

  @Field(() => UserEntity)
  assignedTo: UserEntity;
}
