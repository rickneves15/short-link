import { createZodDto } from 'nestjs-zod/dto'
import * as z from 'nestjs-zod/z'

import { userModelSchema } from '@/common/schemas/models/user'

export const userRegisterSchema = userModelSchema
  .omit({
    id: true,
  })
  .extend({
    password: z
      .password()
      .atLeastOne('digit')
      .atLeastOne('lowercase')
      .atLeastOne('uppercase')
      .min(8)
      .max(100),
  })

export type UserRegister = z.infer<typeof userRegisterSchema>
export class UserRegisterDto extends createZodDto(userRegisterSchema) {}
