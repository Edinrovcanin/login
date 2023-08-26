import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import { setSuperAdmin } from './setsuperadmin';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async registerUser(userDto: User): Promise<User> {
        try {
            return await this.userModel.create(userDto);
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    async loginUser(userDto: User): Promise<User | null> {
        return await this.userModel.findOne({
            email: userDto.email,
            password: userDto.password,
        });
    }

    async setUserRole(userId: string, roleDto: { role: 'user' | 'admin' | 'superadmin' }): Promise<User | null> {
        const user = await this.userModel.findById(userId);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        user.role = roleDto.role;

        try {
            await user.save();
            return user;
        } catch (error) {
            console.error('Error updating user role:', error);
            throw new InternalServerErrorException('Error updating user role');
        }
    }

    async promoteUserToAdmin(userId: string): Promise<User | null> {
        const user = await this.userModel.findById(userId);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        user.role = 'admin';

        try {
            await user.save();
            return user;
        } catch (error) {
            console.error('Promote to admin error:', error);
            throw new InternalServerErrorException('Promote to admin error');
        }
    }

    async demoteAdminToUser(userId: string): Promise<User | null> {
        const user = await this.userModel.findById(userId);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        user.role = 'user';

        try {
            await user.save();
            return user;
        } catch (error) {
            console.error('Demote to user error:', error);
            throw new InternalServerErrorException('Demote to user error');
        }
    }

    async getUsers(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async deleteUser(id: string): Promise<User> {
        const deletedUser = await this.userModel.findByIdAndDelete(id).exec();

        if (!deletedUser) {
            throw new NotFoundException('User not found');
        }

        return deletedUser;
    }

    async getAllUsersForAdmin(): Promise<User[]> {
        return await this.userModel.find({}, 'username email role').exec();
    }

    async setSuperAdmin(): Promise<string> {
        try {
            await setSuperAdmin();
            return 'Superadmin set successfully';
        } catch (error) {
            console.error('Error setting superadmin:', error);
            throw new InternalServerErrorException('Error setting superadmin');
        }
    }
}
