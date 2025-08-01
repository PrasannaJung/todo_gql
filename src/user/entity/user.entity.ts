// user/entity/user.entity.ts
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Expose, Type } from 'class-transformer';

@ObjectType()
class AddressEntity {
  @Field()
  @Expose()
  street: string;

  @Field()
  @Expose()
  area: string;

  @Field()
  @Expose()
  city: string;
}

@ObjectType()
export class UserEntity {
  @Field(() => ID)
  @Expose()
  id: string;

  @Field()
  @Expose()
  username: string;

  @Field()
  @Expose()
  email: string;

  @Field(() => AddressEntity, { nullable: true })
  @Expose()
  @Type(() => AddressEntity)
  address: AddressEntity;
}
