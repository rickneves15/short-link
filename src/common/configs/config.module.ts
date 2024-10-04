import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import { APP_PIPE } from '@nestjs/core'
import { PrismaModule } from 'nestjs-prisma'
import { ZodValidationPipe } from 'nestjs-zod'

import { JwtModule } from './jwt.module'

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: [`${process.cwd()}/.env`],
      cache: true,
      isGlobal: true,
    }),
    PrismaModule.forRoot({
      isGlobal: true,
    }),

    JwtModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class ConfigModule {}
