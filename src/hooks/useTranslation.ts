import { useState, useEffect } from 'react'
import axios from 'axios'

interface TranslateResult {
  loading: boolean
  error: Error | null
  translatedText: string
}

const useTranslate = (inputText: string): TranslateResult => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const [translatedText, setTranslatedText] = useState<string>('')

  useEffect(() => {
    const translateText = async () => {
      setLoading(true)
      setError(null)

      try {
        const translationResponse = await axios.post('/api/translate', {
          text: inputText,
        })

        setTranslatedText(translationResponse.data.translations)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    if (inputText.trim() !== '') {
      translateText()
    }
  }, [inputText])

  return { loading, error, translatedText }
}

export default useTranslate
