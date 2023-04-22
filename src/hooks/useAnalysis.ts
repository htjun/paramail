import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSession } from 'next-auth/react'

const textSeparator = (text: string) => {
  const summary = text.match(/Summary:\s*(.*?)\s*Action points:/)
  const actionPoints = text.match(
    /Action points:\s*([\s\S]*?)\s*Possible answers:/
  )
  const possibleAnswers = text.match(/Possible answers:\s*([\s\S]*)/)

  return {
    summary: summary?.[1],
    actionPoints: actionPoints?.[1],
    possibleAnswers: possibleAnswers?.[1],
  }
}

function processList(text: string) {
  const regex = /_\^/g
  const processedString = text?.replace(regex, '')
  const items =
    processedString?.split('\n').filter(item => item.trim() !== '') || []

  return items
}

interface AnalysisResult {
  loading: boolean
  error: Error | null
  data: {
    summary?: string
    actionPointList?: string[]
    possibleAnswerList?: string[]
  }
}

const useAnalysis = (inputText: string): AnalysisResult => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const [data, setData] = useState<any>({})
  const { data: session } = useSession()

  useEffect(() => {
    const analyseText = async () => {
      setLoading(true)
      setError(null)

      try {
        const analysisResponse = await axios.post('/api/generate', {
          reqType: 'analysis',
          userMessage: inputText,
          session,
        })
        const rawData = analysisResponse.data.result.returnedText
        const { summary, actionPoints, possibleAnswers } =
          textSeparator(rawData)

        const actionPointList = processList(actionPoints)
        const possibleAnswerList = processList(possibleAnswers)

        setData({ summary, actionPointList, possibleAnswerList })

        if (process.env.NODE_ENV === 'development') {
          console.log('Analysis response: ', analysisResponse.data.result)
        }
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    if (inputText.trim() !== '') {
      analyseText()
    }
  }, [inputText, session])

  return { loading, error, data }
}

export default useAnalysis
