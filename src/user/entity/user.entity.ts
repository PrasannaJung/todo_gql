import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserEntity {
  @Field(() => ID)
  id: number;

  @Field()
  username: string;
}
