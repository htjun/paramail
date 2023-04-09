import { ReactNode } from 'react'
import Button from '@/components/Button'
import ErrorMessage from '@/components/ErrorMessage'
import useAutoHeightTextArea from '@/hooks/useAutoHeightTextArea'

interface TextBoxProps {
  placeholder?: string
  value: string
  errorMessage?: string
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
  button,
}: TextBoxProps) => {
  const textAreaRef = useAutoHeightTextArea(2)

  return (
    <div className="flex min-h-[400px] w-full max-w-[800px] flex-col rounded-xl  bg-white drop-shadow-xs">
      <textarea
        ref={textAreaRef}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-full w-full grow resize-none rounded-t-xl border border-gray-200 p-6 outline-none transition-all duration-75 hover:border-grayBlue-200 focus:border-grayBlue-300"
      />
      <div className="flex items-center justify-end gap-6 rounded-b-xl border border-t-0 border-gray-200 p-6">
        {errorMessage && <ErrorMessage text={errorMessage} />}
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
}

export default TextBox
