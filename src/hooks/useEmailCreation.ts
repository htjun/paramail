import { useState, useEffect } from 'react'
import axios from 'axios'

interface EmailCreationResult {
  loading: boolean
  error: Error | null
  data: string
}

const useEmailCreation = ({
  receivedEmailValue,
  answerSummary,
}): EmailCreationResult => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const [data, setData] = useState<string>('')

  useEffect(() => {
    const createEmail = async () => {
      setLoading(true)
      setError(null)

      try {
        const emailCreationResponse = await axios.post('/api/generate', {
          reqType: 'generate',
          userMessage: `Received email: ${receivedEmailValue}
          
          Answer summary: ${answerSummary}`,
        })

        setData(emailCreationResponse.data.result.returnedText)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    if (answerSummary.trim() !== '') {
      createEmail()
    }
  }, [receivedEmailValue, answerSummary])

  return { loading, error, data }
}

export default useEmailCreation
