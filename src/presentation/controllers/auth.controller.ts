import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';

import { LoginDTO, RegisterDTO } from 'src/application/dto/user/user.dto';

import { AuthService } from 'src/application/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: LoginDTO) {
    // The controller delegates all business logic to the service
    return this.authService.signIn(dto);
  };

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() dto: RegisterDTO) {
    return this.authService.signIn(dto);
  };
}
