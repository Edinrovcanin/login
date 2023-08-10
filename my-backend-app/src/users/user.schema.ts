import { Schema, Document } from 'mongoose';
import * as mongoose from 'mongoose';

export interface User extends Document {
    username: string;
    email: string;
    password: string;
}

export const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

export const UserModel = mongoose.model<User>('User', UserSchema);
