import { Module } from '@nestjs/common'
import { JwtModule as NestJwtModule } from '@nestjs/jwt'

import { env } from '@/env'

@Module({
  imports: [
    NestJwtModule.register({
      global: true,
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: env.JWT_ACCESS_EXPIRES },
    }),
  ],
  exports: [NestJwtModule],
})
export class JwtModule {}
