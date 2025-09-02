import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";

import * as bcrypt from 'bcrypt';
import { FindUserDTO, LoginDTO, RegisterDTO, UpdateUserDTO } from "../dto/user/user.dto";
import { UserResponseDTO } from "../dto/user/user.response.dto";

import { UserEntity } from "src/domain/entities/user.entity";

import { IUserService } from "src/domain/interfaces/services/user.service.interface";
import { IUserRepo } from "src/domain/interfaces/repositories/user.repository.interface";

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userRepo: IUserRepo) {};

  private mapToUserEntity(dto: LoginDTO | RegisterDTO | FindUserDTO | UpdateUserDTO): UserEntity {
    return plainToInstance(UserEntity, dto);
  }

  async register(dto: RegisterDTO): Promise<UserResponseDTO> {
    try {
        const passwordHash = await bcrypt.hash(dto.password, 10);

        const userEntity = this.mapToUserEntity(dto);

        const user = await this.userRepo.create(userEntity);

        return plainToInstance(UserResponseDTO, user);

    } catch (error) {
        console.error('Error during user registration:', error);
        // Re-throw specific, known exceptions
        if (error instanceof BadRequestException || error instanceof NotFoundException) {
            throw error;
        }
        throw new InternalServerErrorException('Failed to register user due to an unexpected error.');
    }
  }

  async login(dto: LoginDTO): Promise<UserResponseDTO> {
    try {
        const userEntity = this.mapToUserEntity(dto);

        const user = await this.userRepo.findByEmail(userEntity);
        if (!user) {
        throw new NotFoundException('User not found.');
        }

        const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
        if (!isMatch) {
        throw new NotFoundException('Invalid credentials.');
        };

        return plainToInstance(UserResponseDTO, user);

    } catch (error) {
        console.error('Error during user login:', error);

        if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
        }

        throw new InternalServerErrorException('Failed to login due to an unexpected error.');
    }
  };

  async findByEmail(dto: FindUserDTO): Promise<UserResponseDTO> {
    try {
      const userEntity = this.mapToUserEntity(dto); 

      const user = await this.userRepo.findByEmail(userEntity);
      if (!user) {
        throw new NotFoundException('User not found.');
      }

      return plainToInstance(UserResponseDTO, user);

    } catch (error) {
      console.error(`Error finding user`, error);
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      };

      throw new InternalServerErrorException('Failed to find user due to an unexpected error.');
    }
  };

  async update(id: string, dto: UpdateUserDTO): Promise<UserResponseDTO> {
    try {
        const userEntity = new UserEntity({
            ...dto,
        });

        const user = await this.userRepo.findById(id);
        if (!user) {
        throw new NotFoundException('User not found.');
        };

        const updatedUser = await this.userRepo.update(id, userEntity);

        return plainToInstance(UserResponseDTO, updatedUser);

    } catch (error) {
        console.error(`Error updating user with ID ${id}:`, error);
        if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
        }

        throw new InternalServerErrorException('Failed to update user due to an unexpected error.');
    }
  };
}