import { z } from 'zod'

export const linkModelSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid().nullable(),
  originUrl: z.string(),
  code: z.string(),
  shortUrl: z.string(),
  clicks: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
})
