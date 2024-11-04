import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('refresh')
  async refreshToken(@Body('refresh_token') refresh_token: string) {
    return this.authService.refresh(refresh_token);
  }

  @Post('signup')
  async signup(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.authService.signup(username, password);
  }

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.authService.login(username, password);
  }
}
