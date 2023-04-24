export const sectionContainer =
  'rounded-xl border border-gray-200 bg-white shadow-xs'

export const buttonSecondary =
  'h-9 rounded-lg border border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-800 shadow-xs transition-all hover:bg-gray-50'

export const buttonClasses = (
  style: 'primary' | 'secondary' | 'ghost',
  size: 'sm' | 'md' | 'lg'
) => {
  const baseStyle =
    'flex justify-center items-center shrink-0 font-medium ring-offset-2 transition-all focus:outline-none focus:ring focus:ring-2 focus:ring-indigo-500'

  const buttonStyle = {
    primary:
      'shrink-0 rounded-full bg-indigo-500 bg-subtle font-medium text-white shadow-btn ring-offset-2 transition-all hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-2 focus:ring-indigo-500',
    secondary:
      'rounded-lg border border-gray-300 bg-white font-medium text-gray-800 shadow-xs transition-all hover:bg-gray-50',
    ghost:
      'rounded-lg font-medium text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900',
  }

  const sizeClasses = {
    sm: 'h-9 px-3.5 text-sm',
    md: 'h-10 px-4 text-base',
    lg: 'h-14 px-8 text-lg',
  }

  return `${baseStyle} ${buttonStyle[style]} ${sizeClasses[size]}`
}
