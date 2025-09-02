import { UserEntity } from "src/domain/entities/user.entity";

export interface IUserRepo {
  create(userEntity: Partial<UserEntity>): Promise<UserEntity>;

  findByEmail(userEntity: UserEntity): Promise<UserEntity | null>;

  findById(id: string): Promise<UserEntity>;

  update(id: string, userEntity: Partial<UserEntity>): Promise<UserEntity>;
}
