import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  async login(
    @Body() credentials: { username: string; password: string },
  ): Promise<any> {
    return {
      accessToken: await this.authService.login(
        credentials.username,
        credentials.password,
      ),
    };
  }
}
