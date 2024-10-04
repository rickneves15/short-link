import { z } from 'zod'

export const userModelSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  password: z.string(),
})

export type User = z.infer<typeof userModelSchema>
