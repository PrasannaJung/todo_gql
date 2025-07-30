import { InputType, PartialType } from '@nestjs/graphql';
import { CreateTodoInput } from './create-todo.dto';

@InputType()
export class UpdateTodoInput extends PartialType(CreateTodoInput) {}
