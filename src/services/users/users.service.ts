import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserDTO } from 'src/dto/users/users.dto';
import { User } from 'src/interfaces/users/user.interface';
import { UserRepository } from 'src/repositories/users/user.repository';
import { HashService } from '../hashPassword.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
  ) {}

  async getAllUsers(): Promise<User[]> {
    const allUsers = await this.userRepository.getAllUsers();

    if (!allUsers.length)
      throw new BadRequestException('There are no users registered yet');
    else return allUsers;
  }

  async getUserById(userId: string): Promise<User> {
    try {
      return await this.userRepository.findById(userId);
    } catch (e) {
      throw new BadRequestException('This user does not exist');
    }
  }

  async getUserByName(userName: string): Promise<User[]> {
    return this.userRepository.findUserByName(userName);
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const user = await this.userRepository.getUserByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async saveUser(newUser: UserDTO): Promise<User> {
    const hashedPassword = await this.hashService.hashPassword(
      newUser.password,
    );

    const userToSave = { ...newUser, password: hashedPassword };

    return await this.userRepository.saveUser(userToSave);
  }

  async updateUser(userId: string, user: UserDTO) {
    try {
      const userExists = await this.userRepository.findById(userId);

      if (!userExists)
        throw new BadRequestException('This user does not exist');

      const isSamePassword = await this.hashService.comparePasswords(
        user.password,
        userExists.password,
      );

      if (isSamePassword) user = { ...user, password: userExists.password };
      else {
        const hashedPassword = await this.hashService.hashPassword(
          user.password,
        );

        user = { ...user, password: hashedPassword };
      }

      const updatedUser = await this.userRepository.updateUser(userId, user);

      if (updatedUser) {
        return 'This user was updated successfully';
      } else {
        throw new Error('Failed to update user');
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async deleteUser(userId: string) {
    try {
      const userExists = await this.userRepository.findById(userId);

      if (userExists) {
        const deletedUser = await this.userRepository.deleteUser(userId);

        if (deletedUser) return 'This user was deleted successfully';
      } else {
        throw new BadRequestException('This user does not exist');
      }
    } catch (e) {
      throw new BadRequestException('This user does not exist');
    }
  }
}
