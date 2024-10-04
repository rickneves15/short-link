import { Injectable, Logger } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'

import { ErrorCodeEnum } from '@/common/constants/error-code.constant'
import { BizException } from '@/common/exceptions/biz.exception'
import { User } from '@/common/schemas/models/user'
import { tokenPayloadSchema } from '@/common/types/jwt-response'
import { env } from '@/env'
import { UsersService } from '@/modules/users/users.service'

import {
  UserLoginDto,
  UserLoginResponse,
  userLoginResponseSchema,
} from './dtos/login.dto'

@Injectable()
export class AuthService {
  private Logger = new Logger(AuthService.name)
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async verifyUser(email: string, password: string): Promise<User> {
    this.Logger.log(`Authenticating user: ${email}`)

    const user = await this.usersService.findByEmail(email)

    if (!user || !user.password) {
      throw new BizException(ErrorCodeEnum.UserNotFound)
    }

    const isMatch = await compare(password, user.password)

    if (!isMatch) {
      throw new BizException(ErrorCodeEnum.AuthFail)
    }

    return user
  }

  async login(data: UserLoginDto): Promise<UserLoginResponse> {
    const user = await this.verifyUser(data.email, data.password ?? '')

    this.Logger.log(`Generating access token for user: ${user.email}`)

    const tokenPayload = tokenPayloadSchema.parse({ user })

    const accessToken = this.jwtService.sign(tokenPayload, {
      secret: env.JWT_SECRET,
      expiresIn: env.JWT_ACCESS_EXPIRES,
    })

    this.Logger.log(`Generated access token: ${accessToken}`)

    return userLoginResponseSchema.parse({
      accessToken,
      user,
    })
  }
}
