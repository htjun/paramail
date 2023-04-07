import { ExclamationCircleIcon } from '@heroicons/react/20/solid'

const ErrorMessage = ({ text }: { text: string }) => {
  return (
    <div className="flex gap-2 font-medium text-red-500">
      <ExclamationCircleIcon className="h-6 w-6" />
      <span>{text}</span>
    </div>
  )
}

export default ErrorMessage
