import { Controller, Post, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Controller('users')
export class UsersController {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    @Post('register')
    async registerUser(@Body() userDto: User): Promise<User> {
        const newUser = new this.userModel(userDto);
        return await newUser.save();
    }

    @Post('login')
    async loginUser(@Body() userDto: User): Promise<User | null> {
        return await this.userModel.findOne({
            email: userDto.email,
            password: userDto.password,
        });
    }
}
