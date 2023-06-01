import { ButtonHTMLAttributes, FC } from 'react'
import { type VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { button } from '@/styles/button'
import LoadingDots from './LoadingDots'

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  loading?: boolean
  disabled?: boolean
}

export const Button: FC<ButtonProps> = ({
  className,
  intent,
  size,
  children,
  loading,
  disabled,
  ...rest
}) => {
  const loadingClass = loading
    ? 'relative text-transparent pointer-events-none'
    : ''

  if (disabled) {
    return (
      <div
        className={twMerge(
          button({ intent, size }),
          'pointer-events-none opacity-40'
        )}
      >
        {children}
      </div>
    )
  }

  return (
    <button
      {...rest}
      className={twMerge(button({ intent, size }), loadingClass, className)}
    >
      {children}
      {loading && (
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-md bg-white">
          <LoadingDots dotColor="bg-slate-500" />
        </div>
      )}
    </button>
  )
}
