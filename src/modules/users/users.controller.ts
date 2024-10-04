import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'

import { CurrentUser } from '@/common/decorators/current-user.decorator'
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard'
import { User } from '@/common/schemas/models/user'

import { UserRegisterDto } from './dtos/register.dto'
import { UsersService } from './users.service'

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  register(@Body() user: UserRegisterDto): Promise<User> {
    return this.usersService.create(user)
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@CurrentUser() user: User) {
    return user
  }
}
