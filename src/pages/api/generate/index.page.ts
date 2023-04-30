import { NextApiRequest, NextApiResponse } from 'next'
import { ChatCompletionRequestMessage } from 'openai'
import openai, { configuration } from '@/lib/openai'
import isDevEnv from '@/utils/isDevEnv'
import {
  analysisPromptMessages,
  createReplyEmailPromptMessages,
  createNewEmailPromptMessages,
} from './promptData'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: { message: 'Method not allowed' } })
    return
  }

  if (!configuration.apiKey) {
    res
      .status(500)
      .json({ error: { message: 'OpenAI API key not configured' } })
    return
  }

  const { reqType, userMessage } = req.body

  let promptMessages: ChatCompletionRequestMessage[] = []

  switch (reqType) {
    case 'analysis':
      promptMessages = analysisPromptMessages(userMessage)
      break
    case 'createReplyEmail':
      promptMessages = createReplyEmailPromptMessages(userMessage)
      break
    case 'createNewEmail':
      promptMessages = createNewEmailPromptMessages(userMessage)
      break
    default:
      break
  }

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: promptMessages,
      max_tokens: 2048,
      temperature: 0.1,
    })

    const returnedText = response.data.choices?.[0]?.message?.content
    const usage = Number(response.data.usage?.total_tokens)

    if (isDevEnv) {
      console.log({
        promptMessages,
        returnedText,
      })
    }

    res.status(200).json({
      result: {
        returnedText,
        usage,
      },
    })
  } catch (error: any) {
    res.status(500).json({ error: { message: error.message } })
  }
}

export default handler
