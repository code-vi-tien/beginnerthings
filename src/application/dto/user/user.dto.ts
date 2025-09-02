import { IsEmail, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class LoginDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
};

export class RegisterDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsOptional()
  phone?: string;
};

export class FindUserDTO extends PartialType(LoginDTO) {};

// Makes all properties of RegisterDto optional.
export class UpdateUserDTO extends PartialType(RegisterDTO) {};
