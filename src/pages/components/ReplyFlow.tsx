import { useState, useEffect, useRef } from 'react'
import ReceivedEmailInputSection from './ReceivedEmailInputSection'
import ReceivedEmailTranslationSection from './ReceivedEmailTranslationSection'
import ReceivedEmailAnalysisSection from './ReceivedEmailAnalysisSection'
import CreatedEmailSection from './CreatedEmailSection'

const ReplyFlow = ({ setInProgress }) => {
  const [progressStep, setProgressStep] = useState(0)
  const [receivedEmailValue, setReceivedEmailValue] = useState<string>('')
  const [answerSummary, setAnswerSummary] = useState<string>('')

  const createdEmailSectionRef = useRef(null)

  useEffect(() => {
    if (progressStep !== 0) {
      setInProgress(true)
    }
    if (progressStep === 2) {
      createdEmailSectionRef.current.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }, [progressStep, setInProgress])

  return (
    <div className="flex flex-col gap-16">
      {progressStep === 0 && (
        <ReceivedEmailInputSection
          receivedEmailValue={receivedEmailValue}
          setReceivedEmailValue={setReceivedEmailValue}
          setProgressStep={setProgressStep}
        />
      )}
      {progressStep > 0 && (
        <>
          <ReceivedEmailTranslationSection emailInput={receivedEmailValue} />
          <ReceivedEmailAnalysisSection
            emailInput={receivedEmailValue}
            setProgressStep={setProgressStep}
            setAnswerSummary={setAnswerSummary}
          />
        </>
      )}
      {progressStep > 1 && (
        <div ref={createdEmailSectionRef}>
          <CreatedEmailSection
            receivedEmailValue={receivedEmailValue}
            answerSummary={answerSummary}
          />
        </div>
      )}
    </div>
  )
}

export default ReplyFlow
