import { ButtonHTMLAttributes, ReactNode } from 'react'

interface FancyButtonButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  icon?: ReactNode
  disabled?: boolean
  [x: string]: any
}

const FancyButton = ({
  label,
  onClick,
  icon = null,
  disabled = false,
  ...props
}: FancyButtonButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group h-10 rounded-full bg-indigoGradient p-[1px] disabled:pointer-events-none
          disabled:opacity-30"
      disabled={disabled}
      {...props}
    >
      <div className="flex h-full w-full items-center gap-2 rounded-full bg-white px-4 text-indigo-600 transition-all group-hover:bg-indigoGradient group-hover:text-white">
        {icon && icon}
        <span className="bg-indigoGradient bg-clip-text text-sm font-medium [-webkit-text-fill-color:transparent] group-hover:text-white group-hover:[-webkit-text-fill-color:inherit]">
          {label}
        </span>
      </div>
    </button>
  )
}

export default FancyButton
