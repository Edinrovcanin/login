import mongoose from 'mongoose';
import { AdminModel } from './admin.schema';

export async function setSuperAdmin() {
    try {
        await mongoose.connect('mongodb://localhost:27017/yourdb');

        const admin = await AdminModel.findOne({ email: 'edin.rova2@gmail.com' });

        if (!admin) {
            console.log('Admin not found.');
        } else {
            admin.role = 'superadmin';
            await admin.save();
            console.log(`Admin ${admin.username} is now a superadmin.`);
        }

        mongoose.disconnect();
    } catch (error) {
        console.error('Error:', error);
    }
}
