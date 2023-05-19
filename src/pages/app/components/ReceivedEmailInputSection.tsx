import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { LanguageIcon } from '@heroicons/react/20/solid'
import {
  InboxArrowDownIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline'
import { twMerge } from 'tailwind-merge'
import TextArea from '@/components/TextArea'
import ErrorMessage from '@/components/ErrorMessage'
import { Button } from '@/components/Button'
import useCredit from '@/hooks/useCredit'
import { sectionContainer, guideSection } from '@/styles/sharedClasses'

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
  const [isInsufficientCredit, setIsInsufficientCredit] = useState(false)
  const credit = useCredit()

  useEffect(() => {
    if (credit && credit < 2) {
      setIsInsufficientCredit(true)
      setErrorMessage('크레딧이 부족합니다.')
    } else {
      setIsInsufficientCredit(false)
      setErrorMessage(null)
    }
  }, [credit])

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReceivedEmailValue(e.target.value)
    setErrorMessage(null)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
        className={twMerge(
          sectionContainer,
          'w-full flex-grow px-4 py-6 md:p-6'
        )}
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
          {errorMessage && <ErrorMessage text={errorMessage} />}
          <Button
            type="submit"
            intent="secondary"
            size="md"
            disabled={isInsufficientCredit}
          >
            <LanguageIcon className="h-4 w-4" />
            <span>번역 & 분석</span>
          </Button>
        </div>
      </form>
      <div
        className={twMerge(
          guideSection,
          'hidden w-full max-w-sm flex-col gap-6 lg:flex'
        )}
      >
        <div className="flex items-center gap-1.5">
          <InformationCircleIcon className="h-4 w-4 text-gray-500" />
          <span className="font-medium tracking-tight text-gray-600">
            받은 메일 입력 예시
          </span>
        </div>
        <div className="rounded-md border border-gray-150 bg-gray-50 p-3 text-sm text-gray-500">
          아래와 같이{' '}
          <strong className="font-medium text-gray-600">발신자</strong>와{' '}
          <strong className="font-medium text-gray-600">수신자</strong>의 이름이
          포함되어 있으면 더 정확한 답장을 생성할 수 있습니다.
        </div>
        <div className="prose text-sm text-slate-500">
          <p>Dear Jason,</p>

          <p>
            I hope you&apos;re well. I&apos;ve attached a document with
            marketing and social media ideas and would appreciate your feedback.
            Should we contact Emily for the launch event? Can we discuss this
            over coffee next week?
          </p>
          <p>Looking forward to your response.</p>
          <p>Best,</p>
          <p>Richard</p>
        </div>
      </div>
    </div>
  )
}

export default ReceivedEmailInputSection
