interface TextInputProps {
  id: string
  label: string
}

const TextInput = ({ id, label }: TextInputProps) => {
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="text"
        name={id}
        id={id}
        className="h-10 w-full rounded-md border border-gray-200 px-4 shadow-sm hover:border-grayBlue-200 focus:border-grayBlue-300 focus:outline-none sm:text-sm"
      />
    </div>
  )
}

export default TextInput
