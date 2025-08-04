import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResponse } from 'src/common/response/base.response';

@ObjectType()
export class LoginResponse extends BaseResponse {
  @Field()
  accessToken: string;
}
