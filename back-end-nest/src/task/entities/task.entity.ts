import { Schema, Document } from 'mongoose';

export const TaskSchema = new Schema({
  title: String,
});

export interface Task extends Document {
  title: string;
}
