import { useState, useEffect, useCallback, useRef } from 'react'
import axios from 'axios'
import isDevEnv from '@/utils/isDevEnv'

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
  const prevAnswerSummaryRef = useRef<string | undefined>(undefined)
  const prevNewEmailValueRef = useRef<
    EmailCreationProps['newEmailValue'] | undefined
  >(undefined)

  const createEmail = useCallback(async () => {
    if (
      (answerSummary === prevAnswerSummaryRef.current &&
        newEmailValue === prevNewEmailValueRef.current) ||
      (answerSummary?.trim() === '' && newEmailValue?.content.trim() === '')
    ) {
      return
    }

    setLoading(true)
    setError(null)

    const isReplyEmail = answerSummary && answerSummary.trim() !== ''
    const emailType = isReplyEmail ? 'createReplyEmail' : 'createNewEmail'

    const messageContent =
      emailType === 'createReplyEmail'
        ? `Received email: ${receivedEmailValue}
      
      Answer summary: ${answerSummary}`
        : `Sender: ${newEmailValue?.sender}
      Recipient: ${newEmailValue?.recipient}
      Content: ${newEmailValue?.content}`

    let usageAmount = 0

    try {
      const emailCreationResponse = await axios.post('/api/generate', {
        reqType: emailType,
        userMessage: messageContent,
      })
      const { returnedText, usage } = emailCreationResponse.data.result
      usageAmount = usage
      setData(returnedText)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
      axios.post('/api/usage-log', {
        usageType: `${emailType}${isDevEnv ? '-dev' : ''}`,
        usageAmount,
      })
    }
  }, [receivedEmailValue, answerSummary, newEmailValue])

  useEffect(() => {
    createEmail()
    prevAnswerSummaryRef.current = answerSummary
    prevNewEmailValueRef.current = newEmailValue
  }, [answerSummary, newEmailValue, createEmail])

  return { loading, error, data }
}

export default useEmailCreation
