import { ReactNode } from 'react'
import WandSVG from 'public/wand.svg'
import Button from '@/components/Button'
import useAutoHeightTextArea from '@/hooks/useAutoHeightTextArea'

interface TextBoxProps {
  placeholder?: string
  value: string
  [x: string]: any
  button: {
    label: string
    icon?: ReactNode
    [x: string]: any
  }
}

const TextBox = ({ value, onChange, placeholder, button }: TextBoxProps) => {
  const textAreaRef = useAutoHeightTextArea(2)

  return (
    <div className="flex min-h-[400px] w-full max-w-[960px] flex-col rounded-xl  bg-white drop-shadow-xs">
      <textarea
        ref={textAreaRef}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-full w-full grow resize-none rounded-t-xl border border-gray-200 p-6 outline-none transition-all duration-75 hover:border-grayBlue-200 focus:border-grayBlue-300"
      />
      <div className="flex justify-end rounded-b-xl border border-t-0 border-gray-200 p-6">
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
}

export default TextBox
