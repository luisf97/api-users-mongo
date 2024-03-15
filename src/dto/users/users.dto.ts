import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
} from 'class-validator';

export class UserDTO {
  @IsNotEmpty({ message: 'O campo username não pode estar vazio' })
  @IsString({ message: 'O campo username deve ser uma string' })
  readonly username: string;

  @IsNotEmpty({ message: 'O campo name não pode estar vazio' })
  @IsString({ message: 'O campo name deve ser uma string' })
  readonly name: string;

  @IsNotEmpty({ message: 'O campo email não pode estar vazio' })
  @IsString({ message: 'O campo email deve ser uma string' })
  @IsEmail(
    {},
    { message: 'O campo email deve ser um endereço de e-mail válido' },
  )
  readonly email: string;

  @IsNotEmpty({ message: 'O campo password não pode estar vazio' })
  @IsString({ message: 'O campo password deve ser uma string' })
  @MinLength(6, { message: 'O campo password deve ter no mínimo 6 caracteres' })
  @MaxLength(12, {
    message: 'O campo password deve ter no máximo 12 caracteres',
  })
  readonly password: string;
}
