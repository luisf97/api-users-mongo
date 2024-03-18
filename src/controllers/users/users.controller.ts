import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserDTO } from 'src/dto/users/users.dto';
import { User } from 'src/interfaces/users/user.interface';
import { UsersService } from 'src/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get('id/:userId')
  async getUserById(@Param('userId') userId: string) {
    return await this.userService.getUserById(userId);
  }

  @Get('name/:userName')
  async getUserByName(@Param('userName') userName: string) {
    return await this.userService.getUserByName(userName);
  }

  @Post()
  async saveUser(@Body() newUser: UserDTO): Promise<User> {
    return await this.userService.saveUser(newUser);
  }

  @Patch(':userId')
  async updateUser(@Param('userId') userId: string, @Body() user: UserDTO) {
    return await this.userService.updateUser(userId, user);
  }

  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string) {
    return await this.userService.deleteUser(userId);
  }
}
