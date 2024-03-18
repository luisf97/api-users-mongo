import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { UserModule } from './user.module';
import { UsersService } from 'src/services/users/users.service';
import { HashService } from 'src/services/hashPassword.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret-key-luis',
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, HashService, JwtService],
})
export class AuthModule {}
