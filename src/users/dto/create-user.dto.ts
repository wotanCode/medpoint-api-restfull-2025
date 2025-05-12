import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsDateString,
  IsOptional,
  IsEmail,
  Length,
} from 'class-validator';
import { ValidRoles } from '../../interfaces';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(ValidRoles, { each: true })
  @IsNotEmpty()
  role: ValidRoles[];

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  fullName: string;

  @IsDateString()
  dateOfBirth: string;

  @IsOptional()
  @IsString()
  @Length(5, 20)
  phone?: string;

  @IsOptional()
  @IsEmail()
  @Length(5, 100)
  email?: string;

  @IsOptional()
  @IsString()
  @Length(5, 255)
  address?: string;
}
