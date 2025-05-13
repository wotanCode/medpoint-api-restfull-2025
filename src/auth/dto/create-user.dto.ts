import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsEmail,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {

  @ApiProperty({
    description: 'Email del usuario',
    example: 'usuario@example.com',
    minLength: 5,
    maxLength: 100,
  })
  @IsEmail()
  @Length(5, 100)
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'Password123',
    minLength: 8,
    maxLength: 100,
    pattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(
    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'The password must have an Uppercase letter, lowercase letter and a number',
  })
  password: string;

  @ApiProperty({
    description: 'Nombre completo del usuario',
    example: 'Juan Pérez',
    minLength: 1,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  fullName: string;

  @ApiProperty({
    description: 'Fecha de nacimiento del usuario (formato ISO 8601)',
    example: '1990-01-01',
  })
  @IsDateString()
  dateOfBirth: string;

  @ApiProperty({
    description: 'Número de teléfono del usuario (opcional)',
    example: '1234567890',
    required: false,
    minLength: 5,
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @Length(5, 20)
  phone?: string;

  @ApiProperty({
    description: 'Dirección del usuario (opcional)',
    example: 'Calle Falsa 123, Ciudad, País',
    required: false,
    minLength: 5,
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @Length(5, 255)
  address?: string;
}
