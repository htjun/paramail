import { ChangeEvent } from 'react'
import { twMerge } from 'tailwind-merge'
import useAutoHeightTextArea from '@/hooks/useAutoHeightTextArea'
import { textInput } from '@/styles/sharedClasses'

interface TextAreaProps {
  id: string
  label?: string
  value: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string | undefined
  classNames?: string
  required?: boolean
}

const TextArea = ({
  id,
  label,
  value,
  onChange,
  placeholder = undefined,
  classNames,
  required = false,
}: TextAreaProps) => {
  const textAreaRef = useAutoHeightTextArea(2)
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="flex gap-1.5 text-sm text-gray-800">
          {label}
        </label>
      )}
      <textarea
        ref={textAreaRef}
        name={id}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={twMerge(textInput, 'w-full resize-none p-4', classNames)}
        required={required}
      />
    </div>
  )
}

export default TextArea
