import { LanguageIcon } from '@heroicons/react/20/solid'
import SectionHeader from '@/components/SectionHeader'
import TextBox from '@/components/TextBox'

const ReceivedEmailInputSection = ({
  receivedEmailValue,
  setReceivedEmailValue,
  setProgressStep,
}) => {
  const handleTranslateButtonClick = async e => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setProgressStep(1)
  }
  return (
    <>
      <SectionHeader
        title="받은 메일 입력"
        description="받은 영어 이메일을 입력해 주세요. 제목과 보낸 사람의 이름을 함께 넣으면 더 도움이 됩니다."
      />
      <TextBox
        value={receivedEmailValue}
        onChange={e => setReceivedEmailValue(e.target.value)}
        placeholder="받은 메일을 이곳에 붙여넣기 하세요."
        button={{
          label: '번역 & 분석',
          icon: <LanguageIcon className="h-4 w-4" />,
          onClick: handleTranslateButtonClick,
        }}
      />
    </>
  )
}

export default ReceivedEmailInputSection
