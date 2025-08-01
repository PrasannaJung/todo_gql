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
    type: {
      assignee: {
        name: String,
        id: {
          type: Types.ObjectId,
          ref: 'User',
        },
      },
    },
    // required: true,
    _id: false,
  })
  assignee: {
    name: string;
    id: string;
  };

  @Prop({
    type: {
      assignee: {
        name: String,
        id: {
          type: Types.ObjectId,
          ref: 'User',
        },
      },
    },
    // required: true,
    _id: false,
  })
  assignedTo: {
    name: string;
    id: string;
  };
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
export type TodoDocument = Todo & Document;
