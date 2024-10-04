import { z } from 'zod'

export const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  JWT_ACCESS_EXPIRES: z.string().min(1),
})

export const env = envSchema.parse(process.env)
