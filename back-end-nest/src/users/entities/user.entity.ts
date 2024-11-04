import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema({
  id: String,
  username: String,
  email: String,
  password: String,
});

export interface User extends Document {
  id: string;
  username: string;
  email: string;
  password: string;
}
