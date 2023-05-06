import { ExclamationCircleIcon } from '@heroicons/react/20/solid'

const ErrorMessage = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center gap-1.5 font-medium text-red-500">
      <ExclamationCircleIcon className="h-5 w-5" />
      <span>{text}</span>
    </div>
  )
}

export default ErrorMessage
