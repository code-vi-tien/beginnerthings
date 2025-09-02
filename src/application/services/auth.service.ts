import { BadGatewayException, Injectable, NotAcceptableException, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { UserService } from "./user.service";
import { LoginDTO } from "../dto/user/user.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // This method is called by the AuthController during login
  async signIn(dto: LoginDTO): Promise<any> {
    try {
      const user = await this.userService.findByEmail(dto);
      
      // Validate the password
      const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
      if (!isMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Generate and sign the JWT token
      const payload = { email: user.email, sub: user.id };

      return {
        access_token: this.jwtService.sign(payload),
        userId: user.id
      };

    } catch (error) {
    if (error instanceof NotAcceptableException) {
      throw error; // Re-throw the specific error
    }
      throw new BadGatewayException('An unexpected error occurred during cart update.');
    }
  }

  // This method is called by the AuthGuard to validate the token
  async validateToken(token: string): Promise<any> {
    try {
      const payload = this.jwtService.verify(token);
      
      return payload;

    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
