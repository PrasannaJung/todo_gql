import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({
    type: {
      street: String,
      area: String,
      city: String,
    },
    _id: false,
    // required: true,
  })
  address: {
    street: string;
    city: string;
    zipCode: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
