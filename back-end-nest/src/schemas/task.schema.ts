import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ default: false })
  completed: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
