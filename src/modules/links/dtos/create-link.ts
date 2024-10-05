import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

import { linkModelSchema } from '@/common/schemas/models/link'

export const createLinkSchema = linkModelSchema.pick({
  originUrl: true,
})

export type CreateLink = z.infer<typeof createLinkSchema>
export class CreateLinkDto extends createZodDto(createLinkSchema) {}
