import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HashService {
  async hashPassword(password: string): Promise<string> {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      return hashedPassword;
    } catch (e) {
      console.error('Erro ao gerar o hash da senha:', e);
      throw e;
    }
  }

  // eslint-disable-next-line prettier/prettier
  async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      const isPasswordMatch = await bcrypt.compare(
        plainPassword,
        hashedPassword,
      );

      return isPasswordMatch;
    } catch (e) {
      console.error('Erro ao verificar a senha:', e);
      throw e;
    }
  }
}
