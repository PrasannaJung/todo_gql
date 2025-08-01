import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsPositive } from 'class-validator';

@ArgsType()
export class PaginationInputArgs {
  @Field(() => Int, { defaultValue: 1 })
  @IsInt()
  @IsPositive({ message: 'Page must be a positive integer' })
  page: number = 1;

  @Field(() => Int, { defaultValue: 10 })
  @IsInt()
  @IsPositive({ message: 'Limit must be a positive integer' })
  limit: number = 10;
}
