import { Controller, Post, Body, Get, Param, Put, Patch, Delete, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('register')
    async registerUser(@Body() userDto: User): Promise<User> {
        try {
            return await this.usersService.registerUser(userDto);
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    @Post('login')
    async loginUser(@Body() userDto: User): Promise<User | null> {
        return await this.usersService.loginUser(userDto);
    }

    @Patch(':id/role')
    async setUserRole(@Param('id') userId: string, @Body() roleDto: { role: 'user' | 'admin' | 'superadmin' }): Promise<User | null> {
        return await this.usersService.setUserRole(userId, roleDto);
    }

    @Post(':id/promote') // Promijenjeno u Post
    async promoteUserToAdmin(@Param('id') userId: string): Promise<User | null> {
        return await this.usersService.promoteUserToAdmin(userId);
    }

    @Post(':id/demote') // Promijenjeno u Post
    async demoteAdminToUser(@Param('id') userId: string): Promise<User | null> {
        return await this.usersService.demoteAdminToUser(userId);
    }

    @Get()
    async getUsers(): Promise<User[]> {
        return await this.usersService.getUsers();
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<User> {
        return await this.usersService.deleteUser(id);
    }

    @Get('admin/users')
    async getAllUsersForAdmin(): Promise<User[]> {
        return await this.usersService.getAllUsersForAdmin();
    }

    @Post('set-superadmin')
    async setSuperAdminEndpoint(): Promise<string> {
        try {
            await this.usersService.setSuperAdmin();
            return 'Superadmin set successfully';
        } catch (error) {
            console.error('Error setting superadmin:', error);
            throw new InternalServerErrorException('Error setting superadmin');
        }
    }
}
