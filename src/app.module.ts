import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { UserRepository } from './repositories/users/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './Schema/Users/user.schema';
import { HashService } from './services/hashPassword.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/usersdb'),

    MongooseModule.forFeature([{ name: 'users', schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, HashService],
})
export class AppModule {}
