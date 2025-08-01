import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TodoStatus } from '../entity/todo.entity';
import { Document, Types } from 'mongoose';

@Schema()
export class Todo {
  @Prop()
  title: string;

  @Prop({ type: String, enum: TodoStatus, default: TodoStatus.ACTIVE })
  status: TodoStatus;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  assignee: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  assignedTo: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
export type TodoDocument = Todo & Document;
