import {
  useState,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  FormEvent,
} from 'react'
import { twMerge } from 'tailwind-merge'
import SectionHeader from '@/components/SectionHeader'
import FancyButton from '@/components/FancyButton'
import ErrorMessage from '@/components/ErrorMessage'
import useAutoHeightTextArea from '@/hooks/useAutoHeightTextArea'
import WandSVG from 'public/wand.svg'

interface TextInputProps {
  id: string
  label: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  className?: string
}

const TextInput = ({
  id,
  label,
  value,
  onChange,
  className = '',
}: TextInputProps) => {
  return (
    <div className={twMerge(className, 'flex h-16 items-center p-6')}>
      <label
        htmlFor={id}
        className="grid h-16 shrink-0 place-items-center text-gray-500"
      >
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        className="h-16 w-full bg-transparent p-2 focus:outline-none"
        required
      />
    </div>
  )
}

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
  const textAreaRef = useAutoHeightTextArea(2)

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

  const handleCreateButtonClick = (e: FormEvent<HTMLFormElement>) => {
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
    <div className="flex flex-col gap-8">
      <SectionHeader
        title="새 메일 내용 입력"
        description="작성할 메일의 내용을 한글로 간략히 입력해 주세요."
      />
      <form
        onSubmit={handleCreateButtonClick}
        className="flex w-full max-w-[800px] flex-col rounded-xl bg-white shadow-xs"
      >
        <div className="rounded-t-xl border border-gray-200 outline-none transition-all duration-75 hover:border-grayBlue-200 focus:border-grayBlue-300">
          <div className="grid border-b border-gray-200 md:grid-cols-2">
            <TextInput
              id="recipient"
              label="받는 사람:"
              value={newEmailValue.recipient}
              onChange={handleInputContentChange}
              className="border-b border-gray-200 md:border-none"
            />
            <TextInput
              id="sender"
              label="보내는 사람:"
              value={newEmailValue.sender}
              onChange={handleInputContentChange}
            />
          </div>
          <textarea
            id="content"
            ref={textAreaRef}
            value={newEmailValue.content}
            onChange={handleInputContentChange}
            placeholder="보낼 메일의 내용을 입력해 주세요."
            className="min-h-[300px] w-full grow resize-none p-6 focus:outline-none"
            required
          />
        </div>
        <div className="flex items-center justify-end gap-6 rounded-b-xl border border-t-0 border-gray-200 p-6 text-gray-600">
          {errorMessage && <ErrorMessage text={errorMessage} />}
          <FancyButton
            type="submit"
            label="생성하기"
            icon={<WandSVG className="h-4 w-4" />}
          />
        </div>
      </form>
    </div>
  )
}

export default NewEmailInputSection
