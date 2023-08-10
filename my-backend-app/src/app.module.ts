import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users/users.controller';
import { UserSchema } from './users/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nestjs-mongo'),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [],
})
export class AppModule { }
