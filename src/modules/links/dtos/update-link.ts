import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

import { linkModelSchema } from '@/common/schemas/models/link'

export const updateLinkSchema = linkModelSchema.pick({
  originUrl: true,
})
export type UpdateLink = z.infer<typeof updateLinkSchema>
export class UpdateLinkDto extends createZodDto(updateLinkSchema) {}
