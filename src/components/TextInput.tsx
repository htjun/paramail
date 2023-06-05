import { ChangeEvent } from 'react'
import { twMerge } from 'tailwind-merge'
import { textInput } from '@/styles/sharedClasses'

interface TextInputProps {
  id: string
  label: string
  value: string
  placeholder?: string | undefined
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  className?: string
  required?: boolean
  disabled?: boolean
}

const TextInput = ({
  id,
  label,
  value,
  placeholder = undefined,
  onChange,
  className,
  required = false,
  disabled = false,
}: TextInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="flex gap-1.5 text-sm text-gray-800">
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={twMerge(textInput, 'h-10 w-full', className)}
        required={required}
        disabled={disabled}
      />
    </div>
  )
}

export default TextInput
