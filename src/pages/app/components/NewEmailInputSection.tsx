import {
  useState,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  FormEvent,
} from 'react'
import { twMerge } from 'tailwind-merge'
import TextInput from '@/components/TextInput'
import TextArea from '@/components/TextArea'
import ErrorMessage from '@/components/ErrorMessage'
import {
  PencilSquareIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline'
import {
  sectionContainer,
  buttonClasses,
  guideSection,
} from '@/styles/sharedClasses'
import WandSVG from 'public/wand.svg'

interface NewEmailInputSectionProps {
  setProgressStep: Dispatch<SetStateAction<number>>
  newEmailValue: {
    recipient: string
    sender: string
    content: string
  }
  setNewEmailValue: Dispatch<
    SetStateAction<{
      recipient: string
      sender: string
      content: string
    }>
  >
}

const NewEmailInputSection = ({
  setProgressStep,
  newEmailValue,
  setNewEmailValue,
}: NewEmailInputSectionProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleInputContentChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { id } = e.target

    if (id === 'recipient') {
      setNewEmailValue({ ...newEmailValue, recipient: e.target.value })
    }
    if (id === 'sender') {
      setNewEmailValue({ ...newEmailValue, sender: e.target.value })
    }
    if (id === 'content') {
      setNewEmailValue({ ...newEmailValue, content: e.target.value })
    }
    setErrorMessage(null)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage(null)

    if (newEmailValue.content.length < 10) {
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
          <PencilSquareIcon className="h-4 w-4 text-gray-600" />
          <span className="font-medium tracking-tight text-gray-800">
            새 메일 입력
          </span>
        </div>
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <TextInput
            id="sender"
            label="보내는 사람"
            value={newEmailValue.sender}
            onChange={handleInputContentChange}
          />
          <TextInput
            id="recipient"
            label="받는 사람"
            value={newEmailValue.recipient}
            onChange={handleInputContentChange}
          />
        </div>
        <TextArea
          id="content"
          label="보낼 메일 내용"
          value={newEmailValue.content}
          onChange={handleInputContentChange}
          required
        />
        <div className="mt-6 flex items-center justify-end gap-6">
          {errorMessage && <ErrorMessage text={errorMessage} />}
          <button type="submit" className={buttonClasses('primary', 'md')}>
            <WandSVG className="h-4 w-4" />
            <span>메일 생성</span>
          </button>
        </div>
      </form>
      <div className={twMerge(guideSection, 'hidden w-full max-w-xs lg:block')}>
        <div className="mb-6 flex items-center gap-1.5">
          <InformationCircleIcon className="h-4 w-4 text-gray-500" />
          <span className="font-medium tracking-tight text-gray-600">
            새 메일 입력 예시
          </span>
        </div>
        <div className="grid grid-cols-2 grid-cols-[auto_1fr] gap-x-3 gap-y-4 text-sm text-slate-500">
          <div className="text-slate-700">보내는 사람</div>
          <div>Min-soo</div>
          <div className="text-slate-700">받는 사람</div>
          <div>Brandon</div>
          <div className="text-slate-700">보낼 메일 내용</div>
          <div>
            어제 보낸 문서 받았는지 확인해주세요. 그리고 다음주 미팅 시간
            결정해주세요.
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewEmailInputSection
