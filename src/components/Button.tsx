import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  icon?: React.ReactNode
  variation?: 'primary' | 'secondary'
  disabled?: boolean
  [x: string]: any
}

const Button = ({
  label,
  onClick,
  icon,
  variation,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <>
      {variation === 'primary' && (
        <button
          type="button"
          onClick={onClick}
          className="group h-10 rounded-full bg-suit p-[1px] disabled:pointer-events-none
          disabled:opacity-30"
          disabled={disabled}
          {...props}
        >
          <div className="flex h-full w-full items-center gap-2 rounded-full bg-white px-4 text-[#0968E5] transition-all group-hover:bg-suit group-hover:text-white">
            {icon && icon}
            <span className="bg-suit bg-clip-text text-sm font-medium [-webkit-text-fill-color:transparent] group-hover:text-white group-hover:[-webkit-text-fill-color:inherit]">
              {label}
            </span>
          </div>
        </button>
      )}
      {variation === 'secondary' && (
        <button
          type="button"
          onClick={onClick}
          className="h-9 rounded-lg border border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-800 drop-shadow-xs transition-all hover:bg-gray-50"
          disabled={disabled}
          {...props}
        >
          {label}
        </button>
      )}
    </>
  )
}

Button.defaultProps = {
  icon: null,
  variation: 'primary',
  disabled: false,
}

export default Button
