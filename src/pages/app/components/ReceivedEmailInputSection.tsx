import { useState, ChangeEvent, FormEvent } from 'react'
import { LanguageIcon } from '@heroicons/react/20/solid'
import TextArea from '@/components/TextArea'
import { twMerge } from 'tailwind-merge'
import { sectionContainer, buttonClasses } from '@/styles/sharedClasses'
import {
  InboxArrowDownIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline'

interface ReceivedEmailInputSectionProps {
  receivedEmailValue: string
  setReceivedEmailValue: (value: string) => void
  setProgressStep: (value: number) => void
}

const ReceivedEmailInputSection = ({
  receivedEmailValue,
  setReceivedEmailValue,
  setProgressStep,
}: ReceivedEmailInputSectionProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReceivedEmailValue(e.target.value)
    setErrorMessage(null)
  }

  const handleSubmit = async (e: FormEvent) => {
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
    <div className="flex items-start gap-6">
      <form
        onSubmit={handleSubmit}
        className={twMerge(sectionContainer, 'w-full flex-grow p-6')}
      >
        <div className="mb-6 flex items-center gap-1.5">
          <InboxArrowDownIcon className="h-4 w-4 text-gray-600" />
          <span className="font-medium tracking-tight text-gray-800">
            받은 메일 입력
          </span>
        </div>
        <TextArea
          id="received-email"
          classNames="w-full min-h-[240px]"
          placeholder="받은 영어 이메일을 이곳에 붙여넣기 하세요."
          value={receivedEmailValue}
          onChange={handleInputChange}
          required
        />
        <div className="mt-6 flex items-center justify-end gap-6">
          {errorMessage && (
            <span className="text-sm text-red-500">{errorMessage}</span>
          )}
          <button type="submit" className={buttonClasses('primary', 'md')}>
            <LanguageIcon className="h-4 w-4" />
            <span>번역 & 분석</span>
          </button>
        </div>
      </form>
      <div className="hidden w-full max-w-xs rounded-lg border border-dashed border-gray-250 p-6 lg:block">
        <div className="mb-6 flex items-center gap-1.5">
          <InformationCircleIcon className="h-4 w-4 text-gray-500" />
          <span className="font-medium tracking-tight text-gray-600">
            받은 메일 입력 예시
          </span>
        </div>
        <div className="prose text-sm text-slate-500">
          <p>RBA cash rateraised to 3.85%</p>
          <p>Hi Jason,</p>
          <p>
            Following a pause last month, the Reserve Bank of Australia (RBA)
            today decided to increase the official cash rate by 0.25% to 3.85%.
          </p>
          <p>
            If you&apos;d like to have a chat about what today&apos;s news means
            for you and your finances, please don&apos;t hesitate to get in
            touch.
          </p>
          <p>Regards</p>
          <p>Spiro Kolokithas</p>
        </div>
      </div>
    </div>
  )
}

export default ReceivedEmailInputSection
