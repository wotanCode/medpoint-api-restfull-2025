import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  Matches,
} from 'class-validator';

export class LoginUserDto {
  // Email del usuario
  @ApiProperty({
    description: 'Correo electrónico del usuario para el inicio de sesión',
    example: 'usuario@example.com',
    minLength: 5,
    maxLength: 100,
  })
  @IsEmail()
  @Length(5, 100)
  email: string;

  // Contraseña del usuario
  @ApiProperty({
    description: 'Contraseña del usuario para el inicio de sesión',
    example: 'Password123',
    minLength: 8,
    maxLength: 100,
    pattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(
    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'The password must have an Uppercase, lowercase letter and a number'
  })
  password: string;
}
