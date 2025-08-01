import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from '../entity/user.entity';
import { BaseResponse } from 'src/common/response/base.response';

@ObjectType()
export class UpdateUserResponse extends BaseResponse {
  @Field(() => UserEntity)
  user: UserEntity;
}
