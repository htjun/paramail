import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import SectionHeader from '@/components/SectionHeader'
import useAutoHeightTextArea from '@/hooks/useAutoHeightTextArea'

const TextInput = ({ id, label, value, onChange, className }) => {
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
        className="h-16 w-full p-2 focus:outline-none"
      />
    </div>
  )
}

TextInput.defaultProps = {
  className: '',
}

const NewMailFlow = () => {
  const [inputRecipientName, setInputRecipientName] = useState<string>('')
  const [inputSenderName, setInputSenderName] = useState<string>('')
  const [inputBody, setInputBody] = useState<string>('')
  const textAreaRef = useAutoHeightTextArea(2)

  const handleInputBodyChange = e => {
    setInputBody(e.target.value)
  }

  return (
    <div className="flex flex-col gap-8">
      <SectionHeader
        title="새 메일 내용 입력"
        description="작성할 메일의 내용을 한글로 간략히 입력해 주세요."
      />
      <div className="shadow-xs flex w-full max-w-[800px] flex-col rounded-xl bg-white">
        <div className="rounded-t-xl border border-gray-200 outline-none transition-all duration-75 hover:border-grayBlue-200 focus:border-grayBlue-300">
          <div className="grid grid-cols-2 border-b border-gray-200">
            <TextInput
              id="recipientName"
              label="받는 사람:"
              value={inputRecipientName}
              onChange={e => setInputRecipientName(e.target.value)}
            />
            <TextInput
              id="senderName"
              label="보내는 사람:"
              value={inputSenderName}
              onChange={e => setInputSenderName(e.target.value)}
            />
          </div>
          <textarea
            ref={textAreaRef}
            value={inputBody}
            onChange={handleInputBodyChange}
            placeholder="보낼 메일의 내용을 입력해 주세요."
            className="min-h-[400px] w-full grow resize-none p-6 focus:outline-none"
          />
        </div>
        <div className="flex items-center justify-center gap-6 rounded-b-xl border border-t-0 border-gray-200 p-6 text-gray-600">
          새 메일 생성하기는 아직 개발중입니다.
        </div>
      </div>
    </div>
  )
}

export default NewMailFlow
