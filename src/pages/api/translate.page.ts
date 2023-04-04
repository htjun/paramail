import { NextApiRequest, NextApiResponse } from 'next'

const apiKey = process.env.GOOGLE_API_KEY

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { text } = req.body

    try {
      const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            q: text,
            source: 'en',
            target: 'ko',
            format: 'text',
          }),
        }
      )

      if (response.ok) {
        const data = await response.json()
        const translations = data.data.translations[0].translatedText
        res.status(200).json({ translations })
      } else {
        throw new Error('Translation failed.')
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  } else {
    res.status(405).end() // Method Not Allowed
  }
}
