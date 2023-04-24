import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useSession } from 'next-auth/react'

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
  const { data: session } = useSession()

  const createEmail = useCallback(async () => {
    if (answerSummary.trim() === '') return

    setLoading(true)
    setError(null)

    try {
      const emailCreationResponse = await axios.post('/api/generate', {
        reqType: 'generate',
        userMessage: `Received email: ${receivedEmailValue}
        
        Answer summary: ${answerSummary}`,
        session,
      })

      setData(emailCreationResponse.data.result.returnedText)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }, [receivedEmailValue, answerSummary, session])

  useEffect(() => {
    createEmail()
  }, [answerSummary, createEmail])

  return { loading, error, data }
}

export default useEmailCreation
