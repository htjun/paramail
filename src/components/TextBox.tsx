import { ReactNode, useState } from 'react'
import Button from '@/components/Button'
import ErrorMessage from '@/components/ErrorMessage'
import useAutoHeightTextArea from '@/hooks/useAutoHeightTextArea'

interface TextBoxProps {
  placeholder?: string
  value: string
  errorMessage?: string
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
  placeholder,
  errorMessage,
  maxLength,
  button,
}: TextBoxProps) => {
  const [textCount, setTextCount] = useState(0)
  const textAreaRef = useAutoHeightTextArea(2)

  const handleTextAreaChange = e => {
    onChange(e)
    setTextCount(e.target.value.length)
  }

  return (
    <div className="flex min-h-[400px] w-full max-w-[800px] flex-col rounded-xl  bg-white drop-shadow-xs">
      <textarea
        ref={textAreaRef}
        value={value}
        onChange={handleTextAreaChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className="h-full w-full grow resize-none rounded-t-xl border border-gray-200 p-6 outline-none transition-all duration-75 hover:border-grayBlue-200 focus:border-grayBlue-300"
      />
      <div className="flex items-center justify-end gap-6 rounded-b-xl border border-t-0 border-gray-200 p-6">
        {errorMessage && <ErrorMessage text={errorMessage} />}
        {textCount > maxLength * 0.9 && (
          <div className="text-sm text-gray-400">
            {textCount} / {maxLength}
          </div>
        )}
        <Button
          label={button.label}
          onClick={button.onClick}
          icon={button.icon}
        />
      </div>
    </div>
  )
}

TextBox.defaultProps = {
  placeholder: '',
  errorMessage: null,
  maxLength: 3000,
}

export default TextBox
