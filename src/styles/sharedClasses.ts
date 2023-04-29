export const sectionContainer =
  'rounded-xl border border-gray-200 bg-white shadow-xs'

export const buttonSecondary =
  'h-9 rounded-lg border border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-800 shadow-xs transition-all hover:bg-gray-50'

export const buttonClasses = (
  style: 'cta' | 'primary' | 'secondary' | 'ghost',
  size: 'sm' | 'md' | 'lg' | 'xl'
) => {
  const baseStyle =
    'flex justify-center items-center shrink-0 font-medium ring-offset-2 transition-all focus-visible:outline-none focus-visible:ring focus-visible:ring-2 focus-visible:ring-indigo-500'

  const buttonStyle = {
    cta: 'rounded-full bg-indigo-500 bg-subtle text-white shadow-btn hover:bg-indigo-600 focus-visible:outline-none',
    primary:
      'rounded-lg border border-gray-300 bg-white text-gray-800 shadow-xs hover:bg-gray-50',
    secondary:
      'rounded-lg border border-gray-300 bg-white text-gray-800 shadow-xs hover:bg-gray-50',
    ghost: 'rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900',
  }

  const sizeClasses = {
    sm: 'h-9 px-3.5 text-sm gap-2',
    md: 'h-10 px-4 text-base gap-2',
    lg: 'h-12 px-6 text-base gap-3',
    xl: 'h-14 px-8 text-lg gap-3',
  }

  return `${baseStyle} ${buttonStyle[style]} ${sizeClasses[size]}`
}
