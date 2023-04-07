import { useState, FormEvent } from 'react'
import axios from 'axios'
import Header from '@/components/Header'
import SectionHeader from '@/components/SectionHeader'
import TextBox from '@/components/TextBox'
import TranslationDisplay from '@/components/TranslationDisplay'
import AnalysisDisplay from '@/components/AnalysisDisplay'
import Meta from './components/Meta'

const Home = () => {
  const [progress, setProgress] = useState({
    translated: false,
    generated: false,
  })
  const [inputText, setInputText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [generatedText, setGeneratedText] = useState<any>('')

  const handleTranslateButtonClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const translationResponse = await axios.post('/api/translate', {
        text: inputText,
      })

      setTranslatedText(translationResponse.data.translations)
      setProgress({ ...progress, translated: true })
    } catch (error) {
      console.error(error)
    }

    try {
      const generationResponse = await axios.post('/api/generate', {
        reqType: 'analysis',
        userMessage: inputText,
      })
      if (process.env.NODE_ENV === 'development') {
        console.log(generationResponse.data.result)
      }
      setGeneratedText(generationResponse.data.result.returnedText)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <Meta />
      <div className="flex justify-center">
        <main className="flex w-full max-w-screen-xl flex-col justify-center px-12 pb-16 pt-6">
          <Header isInProgress={progress.translated} />
          <SectionHeader
            title="메일 번역 & 분석"
            description="받은 메일을 한국어로 번역하고, 요점과 요구사항을 정리한 뒤, 답변
            내용 선택지를 생성합니다."
          />
          {!progress.translated && (
            <TextBox
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="받은 메일을 이곳에 붙여넣기 하세요."
              button={{
                label: '번역 & 분석',
                onClick: handleTranslateButtonClick,
              }}
            />
          )}
          {progress.translated && (
            <div className="flex flex-col gap-6">
              <TranslationDisplay
                original={inputText}
                translated={translatedText}
              />
              <AnalysisDisplay
                text={generatedText}
                progress={progress}
                setProgress={setProgress}
              />
            </div>
          )}
          {progress.generated && <div>Hallo</div>}
        </main>
      </div>
    </>
  )
}

export default Home
