import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export interface User extends Document {
  readonly _id: mongoose.Schema.Types.ObjectId;
  readonly username: string;
  readonly name: string;
  readonly email: string;
  readonly password: string;
}
