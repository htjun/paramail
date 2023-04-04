import { useState, FormEvent } from 'react'
import axios from 'axios'
import Meta from './components/Meta'
import Header from '@/components/Header'
import SectionHeader from '@/components/SectionHeader'
import TextBox from '@/components/TextBox'
import TranslationDisplay from '@/components/TranslationDisplay'

export default function Home() {
  const [progress, setProgress] = useState({
    translated: false,
    generated: false,
  })
  const [inputText, setInputText] = useState('')
  const [translatedText, setTranslatedText] = useState('')

  const handleTranslateButtonClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await axios.post('/api/translate', {
        text: inputText,
      })

      setTranslatedText(response.data.translations)
      setProgress({ ...progress, translated: true })
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <Meta />
      <main className="flex flex-col justify-center px-12 py-6">
        <Header />
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
          <TranslationDisplay
            original={inputText}
            translated={translatedText}
          />
        )}
      </main>
    </>
  )
}
