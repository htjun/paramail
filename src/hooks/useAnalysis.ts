import { useState, useEffect, useCallback, useRef } from 'react'
import axios from 'axios'
import isDevEnv from '@/utils/isDevEnv'

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

function processList(text: string | undefined) {
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
  const prevInputTextRef = useRef<string>('')

  const analyseText = useCallback(async () => {
    if (inputText.trim() === '' || inputText === prevInputTextRef.current)
      return

    setLoading(true)
    setError(null)

    let usageAmount = 0

    try {
      const analysisResponse = await axios.post('/api/generate', {
        reqType: 'analysis',
        userMessage: inputText,
      })
      const { returnedText, usage } = analysisResponse.data.result
      usageAmount = usage
      const { summary, actionPoints, possibleAnswers } =
        textSeparator(returnedText)

      const actionPointList = processList(actionPoints)
      const possibleAnswerList = processList(possibleAnswers)

      setData({ summary, actionPointList, possibleAnswerList })
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
      axios.post('/api/update-credit', {
        updateType: 'decrement',
      })
      axios.post('/api/usage-log', {
        usageType: `analysis${isDevEnv ? '-dev' : ''}`,
        usageAmount,
      })
    }
  }, [inputText])

  useEffect(() => {
    analyseText()
    prevInputTextRef.current = inputText
  }, [inputText, analyseText])

  return { loading, error, data }
}

export default useAnalysis
