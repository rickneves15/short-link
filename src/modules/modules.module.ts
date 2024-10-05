import { Module } from '@nestjs/common'

import { AuthModule } from './auth/auth.module'
import { LinksModule } from './links/links.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [AuthModule, LinksModule, UsersModule],
  controllers: [],
  providers: [],
})
export class ModulesModule {}
