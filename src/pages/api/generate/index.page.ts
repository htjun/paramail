import { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'
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

    const { reqType, userMessage } = req.body

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

    try {
      const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: promptMessages,
        max_tokens: 2000,
        temperature: 0.1,
      })

      res.status(200).json({
        result: {
          returnedText: response.data.choices?.[0]?.message?.content,
          usage: response.data.usage?.total_tokens,
        },
      })
    } catch (error: any) {
      if (error.response) {
        console.error(error.response.status, error.response.data)
        res.status(error.response.status).json(error.response.data)
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`)
        res.status(500).json({
          error: {
            message: 'An error occurred during your request.',
          },
        })
      }
    }
  }
}
