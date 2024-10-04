import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common'

import { LocalAuthGuard } from '@/common/guards/local-auth.guard'

import { AuthService } from './auth.service'
import { UserLoginDto } from './dtos/login.dto'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  async login(@Body() data: UserLoginDto) {
    return this.authService.login(data)
  }
}
