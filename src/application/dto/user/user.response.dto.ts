import { Expose } from 'class-transformer';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class UserResponseDTO {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  firstName: string;

  @Expose()
  @IsString()
  lastName: string;

  @Expose()
  @IsString()
  phone?: string;

  @Expose()
  role: 'CUSTOMER' | 'ADMIN';
}