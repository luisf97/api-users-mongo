import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/interfaces/users/user.interface';
import { UserDTO } from 'src/dto/users/users.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel('users') private readonly userModel: Model<User>) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userModel
      .find({}, { __v: false })
      .sort({ name: +1 })
      .exec();
  }

  async findById(userId: string): Promise<User> {
    return await this.userModel.findById(userId, { __v: false });
  }

  async findUserByName(userName: string): Promise<User[]> {
    return await this.userModel.find(
      { name: { $regex: userName, $options: 'i' } },
      { __v: false },
    );
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return await this.userModel.findOne({ username }).exec();
  }

  async saveUser(newUser: UserDTO): Promise<User> {
    const createdUser = new this.userModel(newUser);
    return createdUser.save();
  }

  async updateUser(userId: string, user: UserDTO): Promise<User> {
    return await this.userModel.findOneAndReplace({ _id: userId }, user);
  }

  async deleteUser(userId: string): Promise<User> {
    return await this.userModel.findOneAndDelete({ _id: userId });
  }
}
