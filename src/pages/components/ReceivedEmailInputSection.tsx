import { useState } from 'react'
import { LanguageIcon } from '@heroicons/react/20/solid'
import SectionHeader from '@/components/SectionHeader'
import TextBox from '@/components/TextBox'

const ReceivedEmailInputSection = ({
  receivedEmailValue,
  setReceivedEmailValue,
  setProgressStep,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleInputChange = e => {
    setReceivedEmailValue(e.target.value)
    setErrorMessage(null)
  }

  const handleTranslateButtonClick = async e => {
    e.preventDefault()
    setErrorMessage(null)

    if (receivedEmailValue.length < 10) {
      setErrorMessage('10자 이상이어야 합니다.')
      return
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setProgressStep(1)
  }
  return (
    <div className="flex flex-col gap-8">
      <SectionHeader
        title="받은 메일 입력"
        description="받은 영어 이메일을 입력해 주세요. 제목과 보낸 사람의 이름을 함께 넣으면 더 도움이 됩니다."
      />
      <TextBox
        value={receivedEmailValue}
        onChange={handleInputChange}
        placeholder="받은 메일을 이곳에 붙여넣기 하세요."
        errorMessage={errorMessage}
        button={{
          label: '번역 & 분석',
          icon: <LanguageIcon className="h-4 w-4" />,
          onClick: handleTranslateButtonClick,
        }}
      />
    </div>
  )
}

export default ReceivedEmailInputSection
