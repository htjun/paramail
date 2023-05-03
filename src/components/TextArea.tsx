import { twMerge } from 'tailwind-merge'
import useAutoHeightTextArea from '@/hooks/useAutoHeightTextArea'

interface TextAreaProps {
  id: string
  label?: string
  classNames?: string
  [x: string]: any
}

const TextArea = ({ id, label, classNames, ...props }: TextAreaProps) => {
  const textAreaRef = useAutoHeightTextArea(2)
  return (
    <>
      {label && (
        <label htmlFor={id} className="mb-2 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        ref={textAreaRef}
        name={id}
        id={id}
        className={twMerge(
          'w-full resize-none rounded-md border border-slate-300 p-4 shadow-xs hover:border-grayBlue-200 focus:border-grayBlue-300 focus:outline-none',
          classNames
        )}
        {...props}
      />
    </>
  )
}

export default TextArea
