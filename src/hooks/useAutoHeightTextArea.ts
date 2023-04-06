import { useEffect, useRef, useCallback } from 'react'

const useAutoHeightTextArea = (offset: number = 0) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const onInput = useCallback(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto'
      textAreaRef.current.style.height = `${
        textAreaRef.current.scrollHeight + offset
      }px`
    }
  }, [offset])

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
  }, [onInput])

  return textAreaRef
}

export default useAutoHeightTextArea
