import WandSVG from 'public/wand.svg'
import Button from '@/components/Button'

interface TextBoxProps {
  placeholder?: string
  button: {
    label: string
    onClick: () => void
  }
}

const TextBox = ({ placeholder, button }: TextBoxProps) => {
  return (
    <div className="flex min-h-[400px] w-[720px] flex-col rounded-xl  bg-white">
      <textarea
        placeholder={placeholder}
        className="h-full w-full grow resize-none rounded-t-xl border border-gray-200 p-6 outline-none transition-all duration-75 hover:border-grayBlue-200 focus:border-grayBlue-300"
      />
      <div className="flex justify-end rounded-b-xl border border-t-0 border-gray-200 p-6">
        <Button
          label={button.label}
          onClick={button.onClick}
          icon={<WandSVG className="h-4 w-4" />}
        />
      </div>
    </div>
  )
}

export default TextBox
