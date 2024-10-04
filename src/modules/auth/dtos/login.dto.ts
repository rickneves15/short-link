import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

import { userModelSchema } from '@/common/schemas/models/user'

export const userLoginSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().max(255),
})

export const userLoginResponseSchema = z.object({
  accessToken: z.string(),
  user: userModelSchema.omit({ password: true }),
})

export type UserLogin = z.infer<typeof userLoginSchema>
export type UserLoginResponse = z.infer<typeof userLoginResponseSchema>
export class UserLoginDto extends createZodDto(userLoginSchema) {}
