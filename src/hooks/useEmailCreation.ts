import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useSession } from 'next-auth/react'

interface EmailCreationProps {
  receivedEmailValue?: string
  answerSummary?: string
  newEmailValue?: {
    sender: string
    recipient: string
    content: string
  }
}

interface EmailCreationResult {
  loading: boolean
  error: Error | null
  data: string
}

const useEmailCreation = ({
  receivedEmailValue,
  answerSummary,
  newEmailValue,
}: EmailCreationProps): EmailCreationResult => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const [data, setData] = useState<string>('')
  const { data: session } = useSession()

  const createEmail = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const isReplyEmail = answerSummary && answerSummary.trim() !== ''
      const emailType = isReplyEmail ? 'createReplyEmail' : 'createNewEmail'
      const messageContent =
        emailType === 'createReplyEmail'
          ? `Received email: ${receivedEmailValue}
        
        Answer summary: ${answerSummary}`
          : `Sender: ${newEmailValue?.sender}
        Recipient: ${newEmailValue?.recipient}
        Content: ${newEmailValue?.content}`

      const emailCreationResponse = await axios.post('/api/generate', {
        reqType: emailType,
        userMessage: messageContent,
        session,
      })

      setData(emailCreationResponse.data.result.returnedText)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }, [receivedEmailValue, answerSummary, newEmailValue])

  useEffect(() => {
    if (answerSummary?.trim() !== '' || newEmailValue?.content.trim() !== '') {
      createEmail()
    }
  }, [answerSummary, newEmailValue, createEmail])

  return { loading, error, data }
}

export default useEmailCreation
