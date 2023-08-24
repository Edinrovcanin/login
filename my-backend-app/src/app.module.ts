import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service'; // Dodali smo import za UsersService
import { UserSchema } from './users/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nestjs-mongo'),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService], // Dodali smo UsersService kao providera
})
export class AppModule { }
