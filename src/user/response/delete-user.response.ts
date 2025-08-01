import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResponse } from 'src/common/response/base.response';
import { UserEntity } from '../entity/user.entity';

@ObjectType()
export class DeleteUserResponse extends BaseResponse {
  @Field(() => UserEntity)
  user: UserEntity;
}
