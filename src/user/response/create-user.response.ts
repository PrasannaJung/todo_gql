import { BaseResponse } from 'src/common/response/base.response';
import { UserEntity } from '../entity/user.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateUserResponse extends BaseResponse {
  @Field(() => UserEntity)
  user: UserEntity;
}
