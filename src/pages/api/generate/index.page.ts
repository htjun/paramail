import { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'
import prisma from '@/lib/prismadb'
import { analysisPromptMessages, generatePromptMessages } from './promptData'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    if (!configuration.apiKey) {
      res
        .status(500)
        .json({ error: { message: 'OpenAI API key not configured' } })
      return
    }

    const { reqType, userMessage, session } = req.body

    let promptMessages = []

    switch (reqType) {
      case 'analysis':
        promptMessages = analysisPromptMessages(userMessage)
        break
      case 'generate':
        promptMessages = generatePromptMessages(userMessage)
        break
      default:
        break
    }

    const prismaUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    })

    try {
      const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: promptMessages,
        max_tokens: 2000,
        temperature: 0.1,
      })

      const returnedText = response.data.choices?.[0]?.message?.content
      const usage = Number(response.data.usage.total_tokens)

      res.status(200).json({
        result: {
          returnedText,
          usage,
        },
      })

      // eslint-disable-next-line no-unused-vars
      const usageResponse = await prisma.usage.create({
        data: {
          userId: prismaUser.id,
          tokenUsage: usage,
          usageType: String(reqType),
        },
      })
    } catch (error: any) {
      if (error.response) {
        console.error(
          'Error response from OpenAI API:',
          error.response.status,
          error.response.data
        )
        res.status(error.response.status).json(error.response.data)
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`)
        console.error('Error details:', error)
        res.status(500).json({
          error: {
            message: 'An error occurred during your request.',
          },
        })
      }
    }
  }
}
