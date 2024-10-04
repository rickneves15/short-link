import { Injectable, Logger } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { PrismaService } from 'nestjs-prisma'

import { ErrorCodeEnum } from '@/common/constants/error-code.constant'
import { BizException } from '@/common/exceptions/biz.exception'
import { User } from '@/common/schemas/models/user'

import { UserRegisterDto, userRegisterSchema } from './dtos/register.dto'

@Injectable()
export class UsersService {
  private Logger = new Logger(UsersService.name)

  constructor(private readonly prisma: PrismaService) {}

  async create(data: UserRegisterDto): Promise<User> {
    const { password, email } = userRegisterSchema.parse(data)

    const isExist = await this.findByEmail(email)

    if (isExist) {
      throw new BizException(ErrorCodeEnum.UserExist)
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await this.prisma.user.create({
      data: {
        email,
        password: passwordHash,
      },
    })

    this.Logger.log(`Creating user: ${data.email}`)

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    })
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    })
  }
}
