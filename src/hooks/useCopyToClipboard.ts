import { useState } from 'react'
import copy from 'copy-to-clipboard'

export default function useCopyToClipboard() {
  const [value, setValue] = useState<string | undefined>()
  const [success, setSuccess] = useState<boolean>()

  const copyToClipboard = (text: string, options: any) => {
    const result = copy(text, options)
    if (result) setValue(text)
    setSuccess(result)

    setTimeout(() => {
      setSuccess(false)
    }, 2000)
  }

  return [copyToClipboard, { value, success }]
}
