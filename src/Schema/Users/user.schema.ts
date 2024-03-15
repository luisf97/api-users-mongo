import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  username: String,
  name: String,
  email: String,
  password: String,
});
