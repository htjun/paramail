import { ReactNode, useState, FormEvent, ChangeEvent } from 'react'
import FancyButton from '@/components/FancyButton'
import ErrorMessage from '@/components/ErrorMessage'
import useAutoHeightTextArea from '@/hooks/useAutoHeightTextArea'

interface TextBoxProps {
  placeholder?: string
  value: string
  errorMessage?: string | null
  maxLength?: number
  [x: string]: any
  button: {
    label: string
    icon?: ReactNode
    [x: string]: any
  }
}

const TextBox = ({
  value,
  onChange,
  placeholder = '',
  errorMessage = null,
  maxLength = 3000,
  button,
}: TextBoxProps) => {
  const [textCount, setTextCount] = useState(0)
  const textAreaRef = useAutoHeightTextArea(2)

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e)
    setTextCount(e.target.value.length)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    button.onClick(e)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="drop-shadow-xs flex min-h-[400px] w-full max-w-[800px] flex-col  rounded-xl bg-white"
    >
      <textarea
        ref={textAreaRef}
        value={value}
        onChange={handleTextAreaChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className="h-full w-full grow resize-none rounded-t-xl border border-gray-200 p-6 outline-none transition-all duration-75 hover:border-grayBlue-200 focus:border-grayBlue-300"
        required
      />
      <div className="flex flex-col items-end justify-end gap-4 rounded-b-xl border border-t-0 border-gray-200 p-6 sm:flex-row sm:items-center sm:gap-6">
        {errorMessage && <ErrorMessage text={errorMessage} />}
        {textCount > maxLength * 0.9 && (
          <div className="text-sm text-gray-400">
            {textCount} / {maxLength}
          </div>
        )}
        <FancyButton type="submit" label={button.label} icon={button.icon} />
      </div>
    </form>
  )
}

export default TextBox
