import { Schema, Document, model } from 'mongoose';

export interface Admin extends Document {
    username: string;
    email: string;
    password: string;
    role: 'user' | 'admin' | 'superadmin';
}

export const AdminSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['user', 'admin', 'superadmin'] },
});

export const AdminModel = model<Admin>('Admin', AdminSchema); // Izvoz AdminModel
