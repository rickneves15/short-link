import { randomBytes } from 'node:crypto'

export const generateRandomString = (length: number = 6): string => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  const bytes = randomBytes(length)

  for (let i = 0; i < length; i++) {
    result += characters[bytes[i] % characters.length]
  }

  return result
}
