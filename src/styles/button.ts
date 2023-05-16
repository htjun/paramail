import { cva, type VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

const buttonVariants = cva(
  [
    'flex',
    'justify-center',
    'items-center',
    'shrink-0',
    'font-medium',
    'ring-offset-2',
    'transition-all',
    'focus-visible:ring-2',
    'focus-visible:ring-indigo-500',
    'disabled:opacity-40',
    'disabled:pointer-events-none',
  ],
  {
    variants: {
      intent: {
        primary: [
          'rounded-md',
          'bg-indigo-500',
          'text-white',
          'shadow-xs',
          'hover:bg-indigo-600',
        ],
        secondary: [
          'rounded-md',
          'border',
          'border-slate-300',
          'bg-white',
          'text-gray-800',
          'shadow-xs',
          'hover:bg-gray-50',
        ],
        ghost: [
          'rounded-lg',
          'text-gray-500',
          'hover:bg-gray-100',
          'hover:text-gray-900',
        ],
      },
      size: {
        sm: ['h-9', 'px-3.5', 'text-sm', 'gap-2'],
        md: ['h-10', 'px-4', 'text-sm', 'gap-2'],
        lg: ['h-12', 'px-6', 'text-base', 'gap-3'],
        xl: ['h-14', 'px-8', 'text-lg', 'gap-3'],
      },
    },
    defaultVariants: {
      intent: 'secondary',
      size: 'md',
    },
  }
)

export interface ButtonVariants extends VariantProps<typeof buttonVariants> {}

export const button = (variants: ButtonVariants) =>
  twMerge(buttonVariants(variants))
