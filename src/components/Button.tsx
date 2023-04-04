interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  icon?: React.ReactNode
  [x: string]: any
}

const Button = ({ label, onClick, icon, ...props }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="group h-10 rounded-full bg-suit p-[1px]"
      {...props}
    >
      <div className="flex h-full w-full items-center gap-2 rounded-full bg-white px-4 text-[#0968E5] transition-all group-hover:bg-suit group-hover:text-white">
        {icon && icon}
        <span className="bg-suit bg-clip-text text-sm font-medium [-webkit-text-fill-color:transparent] group-hover:text-white group-hover:[-webkit-text-fill-color:inherit]">
          {label}
        </span>
      </div>
    </button>
  )
}

export default Button
