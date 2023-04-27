import { PrismaClient } from '@prisma/client'
import isDevEnv from '@/utils/isDevEnv'

declare global {
  // eslint-disable-next-line
  var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient()
if (isDevEnv) globalThis.prisma = client

export default client
