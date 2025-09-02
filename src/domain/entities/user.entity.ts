import { User as PrismaUser, Role } from '@prisma/client';
import { IsString, IsEmail, IsEnum, IsDate } from 'class-validator';

export class UserEntity {
  @IsString()
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  passwordHash: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  phone: string;

  @IsEnum(Role)
  role: 'CUSTOMER' | 'ADMIN';

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  constructor(data: Partial<UserEntity>) {
    Object.assign(this, data);
  }
}