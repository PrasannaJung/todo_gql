import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export function createPaginatedResponse<T>(classRef: Type<T>): any {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponse {
    @Field(() => [classRef])
    items: T[];

    @Field(() => Int)
    totalPages: number;

    @Field(() => Int)
    currentPage: number;

    @Field(() => Int)
    itemsPerPage: number;

    @Field(() => Int)
    totalItems: number;
  }
  return PaginatedResponse;
}
