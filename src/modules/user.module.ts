import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/Schema/Users/user.schema';
import { UsersController } from 'src/controllers/users/users.controller';
import { UserRepository } from 'src/repositories/users/user.repository';
import { HashService } from 'src/services/hashPassword.service';
import { UsersService } from 'src/services/users/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'users', schema: UserSchema }]),
    MongooseModule.forRoot('mongodb://localhost/usersdb'),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, HashService, JwtService],
  exports: [UserRepository],
})
export class UserModule {}
