import { useState } from 'react'
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

  return (
    <>
      <Meta />
      <div className="flex justify-center">
        <main className="flex w-full max-w-screen-xl flex-col justify-center px-12 pb-16 pt-6">
          <Header isInProgress={progressStep !== 0} />
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
            <CreatedEmailSection
              receivedEmailValue={receivedEmailValue}
              answerSummary={answerSummary}
            />
          )}
        </main>
      </div>
    </>
  )
}

export default Home
