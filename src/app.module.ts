import { Module } from '@nestjs/common'

import { ConfigModule } from '@/common/configs/config.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ModulesModule } from './modules/modules.module'

@Module({
  imports: [ModulesModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
