import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { Request } from 'express'

import { CurrentUser } from '@/common/decorators/current-user.decorator'
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard'
import { UserAuthGuard } from '@/common/guards/user-auth.guard'
import { User } from '@/common/schemas/models/user'

import { CreateLinkDto } from './dtos/create-link'
import { UpdateLinkDto } from './dtos/update-link'
import { LinksService } from './links.service'

@Controller()
export class LinksController {
  private Logger = new Logger(LinksController.name)

  constructor(private readonly linksService: LinksService) {}

  @Get('links')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async getLinks(@CurrentUser() user: User) {
    return this.linksService.list(user)
  }

  @Get('/:code')
  @HttpCode(308)
  async redirect(@Param('code') code: string, @Res() response: any) {
    const link = await this.linksService.redirect(code)

    return response.redirect(link.originUrl)
  }

  @Post('links')
  @HttpCode(200)
  @UseGuards(UserAuthGuard)
  async newLink(
    @Body() data: CreateLinkDto,
    @CurrentUser() user: User,
    @Req() request: Request,
  ) {
    return this.linksService.create(data, user, request)
  }

  @Patch('links/:id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async updateLink(
    @Param('id') id: string,
    @Body() data: UpdateLinkDto,
    @CurrentUser() user: User,
  ) {
    return this.linksService.update(id, data, user)
  }

  @Delete('links/:id')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  async deleteLink(@Param('id') id: string, @CurrentUser() user: User) {
    return this.linksService.delete(id, user)
  }
}
