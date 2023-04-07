import { useState, useEffect, useRef } from 'react'
import Header from '@/components/Header'
import Meta from './components/Meta'
import ReceivedEmailInputSection from './components/ReceivedEmailInputSection'
import ReceivedEmailTranslationSection from './components/ReceivedEmailTranslationSection'
import ReceivedEmailAnalysisSection from './components/ReceivedEmailAnalysisSection'
import CreatedEmailSection from './components/CreatedEmailSection'

const Home = () => {
  const [progressStep, setProgressStep] = useState(0)
  const [receivedEmailValue, setReceivedEmailValue] = useState<string>('')
  const [answerSummary, setAnswerSummary] = useState<string>('')

  const createdEmailSectionRef = useRef(null)

  useEffect(() => {
    if (progressStep === 2) {
      createdEmailSectionRef.current.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }, [progressStep])

  return (
    <>
      <Meta />
      <div className="flex justify-center">
        <main className="flex w-full max-w-screen-xl flex-col justify-center gap-12 px-12 pb-16 pt-6">
          <Header isInProgress={progressStep !== 0} />
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
                <ReceivedEmailTranslationSection
                  emailInput={receivedEmailValue}
                />
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
        </main>
      </div>
    </>
  )
}

export default Home
