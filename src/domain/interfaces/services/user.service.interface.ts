import { LoginDTO, RegisterDTO } from 'src/application/dto/user/user.dto';
import { UserResponseDTO } from 'src/application/dto/user/user.response.dto';

export interface IUserService {
  register(dto: RegisterDTO): Promise<UserResponseDTO>;

  login(dto: LoginDTO): Promise<UserResponseDTO>;
}