import { useEffect, useRef } from 'react'

const useAutoHeightTextArea = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const onInput = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto'
      textAreaRef.current.style.height = `${
        textAreaRef.current.scrollHeight + 2
      }px`
    }
  }

  useEffect(() => {
    const textArea = textAreaRef.current
    if (textArea) {
      textArea.addEventListener('input', onInput)
    }
    return () => {
      if (textArea) {
        textArea.removeEventListener('input', onInput)
      }
    }
  }, [])

  return textAreaRef
}

export default useAutoHeightTextArea
