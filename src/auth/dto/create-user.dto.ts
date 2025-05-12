import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsDateString,
  IsOptional,
  IsEmail,
  Length,
  Matches,
} from 'class-validator';
import { ValidRoles } from '../../interfaces';

export class CreateUserDto {
  @IsEmail()
  @Length(5, 100)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(
    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'The password must have a Uppercase, lowercase letter and a number'
  })
  password: string;

  // @IsEnum(ValidRoles, { each: true })
  // @IsNotEmpty()
  // role: ValidRoles[];

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
  @IsString()
  @Length(5, 255)
  address?: string;
}
