import { Injectable, Logger } from '@nestjs/common'
import { Request } from 'express'
import { PrismaService } from 'nestjs-prisma'

import { ErrorCodeEnum } from '@/common/constants/error-code.constant'
import { BizException } from '@/common/exceptions/biz.exception'
import { User } from '@/common/schemas/models/user'
import { generateRandomString } from '@/lib/string'
import { Prisma } from '@prisma/client'

import { CreateLink } from './dtos/create-link'
import { UpdateLink } from './dtos/update-link'

@Injectable()
export class LinksService {
  private Logger = new Logger(LinksService.name)

  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: CreateLink,
    user: User | null,
    request: Request,
  ): Promise<any> {
    const code = generateRandomString()
    const shortUrl = `${request.protocol}://${request.get('host')}/${code}`

    const isExist = await this.find({
      originUrl: data.originUrl,
      deletedAt: null,
    })

    if (isExist) {
      this.Logger.log(`Link already exist: ${data.originUrl}`)
      throw new BizException(ErrorCodeEnum.LinkExist)
    }

    this.Logger.log(`Creating link: ${data.originUrl}`)
    const link = await this.prisma.links.create({
      data: {
        originUrl: data.originUrl,
        code,
        shortUrl,
        user: user?.id ? { connect: { id: user.id } } : undefined,
      },
    })

    return link
  }

  async find(where: Prisma.LinksWhereInput): Promise<any> {
    const link = await this.prisma.links.findFirst({
      where,
    })

    return link
  }

  async list(user: User): Promise<any> {
    this.Logger.log(`Listing links: ${user.id}`)
    return this.prisma.links.findMany({
      select: {
        id: true,
        originUrl: true,
        code: true,
        shortUrl: true,
        clicks: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        deletedAt: null,
        userId: user.id,
      },
    })
  }

  async update(id: string, data: UpdateLink, user: User): Promise<any> {
    const isExist = await this.find({
      id,
    })

    if (!isExist) {
      this.Logger.log(`Link not found: ${id}`)
      throw new BizException(ErrorCodeEnum.LinkNotFound)
    }

    if (isExist.userId && isExist.userId !== user.id) {
      this.Logger.log(`Link authorization failed: ${id}`)
      throw new BizException(ErrorCodeEnum.LinkAuthorizationFailed)
    }

    this.Logger.log(`Updating link: ${id}`)
    return this.prisma.links.update({
      where: {
        id,
      },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    })
  }

  async delete(id: string, user: User): Promise<any> {
    const isExist = await this.find({
      id,
      userId: user.id,
      deletedAt: null,
    })

    if (!isExist) {
      this.Logger.log(`Link not found: ${id}`)
      throw new BizException(ErrorCodeEnum.LinkNotFound)
    }

    if (isExist.userId && isExist.userId !== user.id) {
      this.Logger.log(`Link authorization failed: ${id}`)
      throw new BizException(ErrorCodeEnum.LinkAuthorizationFailed)
    }

    this.Logger.log(`Deleting link: ${id}`)
    await this.prisma.links.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    })
  }

  async redirect(code: string): Promise<any> {
    const link = await this.find({
      code,
      deletedAt: null,
    })

    if (!link) {
      this.Logger.log(`Link not found: ${code}`)
      throw new BizException(ErrorCodeEnum.LinkNotFound)
    }

    this.Logger.log(`Updating access count for link: ${code}`)
    await this.prisma.links.update({
      where: {
        id: link.id,
        code,
      },
      data: {
        clicks: {
          increment: 1,
        },
      },
    })

    this.Logger.log(`Redirecting link: ${code}`)
    return link
  }
}
