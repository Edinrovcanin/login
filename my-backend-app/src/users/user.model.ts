import { Schema, Document } from 'mongoose';

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    role: 'user' | 'admin' | 'superadmin';
}

export const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['user', 'admin', 'superadmin'] },
});
