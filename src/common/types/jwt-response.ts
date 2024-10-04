import { z } from 'zod'

import { userModelSchema } from '../schemas/models/user'

export const tokenPayloadSchema = z.object({
  user: userModelSchema.omit({ password: true }),
})

export type TokenPayload = z.infer<typeof tokenPayloadSchema>
