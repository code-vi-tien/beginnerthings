import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

import { UserEntity } from 'src/domain/entities/user.entity';

import { IUserRepo } from 'src/domain/interfaces/repositories/user.repository.interface';

@Injectable()
export class UserRepo implements IUserRepo {
  constructor(private prisma: PrismaService) {}

  private mapEntityToPrisma(entity: Partial<UserEntity>) {
    const data: any = {};

    if (entity.email !== undefined) {
      data.email = entity.email;
    }

    if (entity.passwordHash !== undefined) {
      data.passwordHash = entity.passwordHash;
    }

    if (entity.lastName !== undefined) {
      data.lastName = entity.lastName;
    }

    if (entity.firstName !== undefined) {
      data.firstName = entity.firstName;
    }
    
    if (entity.phone !== undefined) {
      data.phone = entity.phone;
    }

    if (entity.role !== undefined) {
      data.role = entity.role;
    }

    if (entity.createdAt !== undefined) {
      data.createdAt = entity.createdAt;
    }

    if (entity.updatedAt !== undefined) {
      data.updatedAt = entity.updatedAt;
    }

    return data;
  };

  private mapToDomainEntity(prismaUser: any): UserEntity {
    return new UserEntity({
      id: prismaUser.id,
      email:prismaUser.email,
      passwordHash: prismaUser.passwordHash,
      firstName: prismaUser.firstName,
      lastName: prismaUser.lastName,
      phone: prismaUser.phone,
      role: prismaUser.role,
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt
    });
  };

  async create(userEntity: Partial<UserEntity>): Promise<UserEntity> {
    try {
      const createdUser = await this.prisma.user.create({ 
        data: this.mapEntityToPrisma(userEntity)
      });

      return this.mapToDomainEntity(createdUser);

    } catch (error) {
      if (error.code === 'P2002') {
        //throw new DuplicateUserError('User already exists');
      };

      if (error.code === 'P2025') {
        //throw new UserNotFoundError('User not found');
      };
      
      // Wrap unknown database errors
      //throw new DatabaseError('Failed to retrieve user', error);
    }
  };

  async findByEmail(userEntity: UserEntity): Promise<UserEntity | null> {
    try {
      const user = await this.prisma.user.findUnique({ 
        where: { email: userEntity.email } 
      });

      if (!user) return null;

      return this.mapToDomainEntity(user);  

    } catch (error) {
      if (error.code === 'P2025') {
        //throw new UserNotFoundError('User not found');
      };
      // Wrap unknown database errors
      //throw new DatabaseError('Failed to retrieve user', error); 
    }
  };

  async findById(id: string): Promise<UserEntity> {
    try {
      const user = await this.prisma.user.findUnique({ 
        where: { id } 
      });

      if (!user) return null;

      return this.mapToDomainEntity(user);

    } catch (error) {
      if (error.code === 'P2025') {
        //throw new UserNotFoundError('User not found');
      };
      // Wrap unknown database errors
      //throw new DatabaseError('Failed to retrieve user', error); 
    }
  };

  async update(id: string, userEntity: Partial<UserEntity>): Promise<UserEntity> {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: this.mapEntityToPrisma(userEntity),
      });

      return this.mapToDomainEntity(updatedUser);

    } catch (error) {
      if (error.code === 'P2025') {
        //throw new UserNotFoundError('User not found');
      };
      
      // Wrap unknown database errors
      //throw new DatabaseError('Failed to retrieve user', error);
    }
  };
}