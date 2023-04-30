import { useState, useEffect } from 'react'
import NewEmailInputSection from './NewEmailInputSection'
import CreatedEmailSection from './CreatedEmailSection'

const NewMailFlow = ({
  setInProgress,
}: {
  setInProgress: (inProgress: boolean) => void
}) => {
  const [progressStep, setProgressStep] = useState(0)
  const [newEmailValue, setNewEmailValue] = useState({
    recipient: '',
    sender: '',
    content: '',
  })

  useEffect(() => {
    if (progressStep !== 0) {
      setInProgress(true)
    }
  }, [progressStep, setInProgress])

  return (
    <div className="flex flex-col gap-16">
      {progressStep === 0 && (
        <div>
          <NewEmailInputSection
            setProgressStep={setProgressStep}
            newEmailValue={newEmailValue}
            setNewEmailValue={setNewEmailValue}
          />
        </div>
      )}
      {progressStep > 0 && (
        <CreatedEmailSection newEmailValue={newEmailValue} />
      )}
    </div>
  )
}

export default NewMailFlow
