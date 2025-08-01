import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserEntity {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  email: string;
}
