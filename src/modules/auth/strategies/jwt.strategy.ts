import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { TokenPayload } from '@/common/types/jwt-response'
import { env } from '@/env'
import { UsersService } from '@/modules/users/users.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.JWT_SECRET,
    })
  }

  async validate(payload: TokenPayload) {
    return await this.usersService.findById(payload.user.id)
  }
}
