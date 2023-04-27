import { NextApiResponse, NextApiRequest } from 'next'
import prisma from '@/lib/prismadb'
import isDevEnv from '@/utils/isDevEnv'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, tokenUsage, type } = req.body
  const usageType = isDevEnv ? `${type}-dev` : type

  try {
    const response = await prisma.usage.create({
      data: {
        userId,
        tokenUsage,
        type: usageType,
      },
    })
    if (isDevEnv) {
      console.log('Prisma response', response)
    }
  } catch (error) {
    res.status(500).json({ error: { message: error.message } })
  }
}

export default handler
