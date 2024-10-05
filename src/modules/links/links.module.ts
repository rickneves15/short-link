import { Module } from '@nestjs/common'

import { LinksController } from './links.controller'
import { LinksService } from './links.service'

@Module({
  imports: [],
  controllers: [LinksController],
  providers: [LinksService],
  exports: [LinksService],
})
export class LinksModule {}
