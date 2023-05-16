import { useState, Dispatch, SetStateAction, MouseEvent } from 'react'
import { CheckIcon } from '@heroicons/react/20/solid'
import SectionHeader from '@/components/SectionHeader'
import SectionSubHeader from '@/components/SectionSubHeader'
import LoadingDots from '@/components/LoadingDots'
import ErrorMessage from '@/components/ErrorMessage'
import useAnalysis from '@/hooks/useAnalysis'
import { sectionContainer } from '@/styles/sharedClasses'
import { button } from '@/styles/button'
import WandSVG from 'public/wand.svg'
import AnswerPresetsToggleGroup from './AnswerPresetsToggleGroup'

interface ReceivedEmailAnalysisSectionProps {
  emailInput: string
  setProgressStep: Dispatch<SetStateAction<number>>
  setAnswerSummary: Dispatch<SetStateAction<string>>
}

const ReceivedEmailAnalysisSection = ({
  emailInput,
  setProgressStep,
  setAnswerSummary,
}: ReceivedEmailAnalysisSectionProps) => {
  const { loading, error, data } = useAnalysis(emailInput)
  const { summary, actionPointList = [], possibleAnswerList = [] } = data
  const [toggleActiveItem, setToggleActiveItem] = useState<number | null>(null)
  const [answer, setAnswer] = useState<string>('')

  const handleMailCreation = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setAnswerSummary(answer)
    setProgressStep(2)
  }

  return (
    <div className="flex flex-col gap-8">
      <SectionHeader
        title="메일 분석"
        description="받은 메일을 요약하고 가능한 답변 목록을 생성합니다."
      />
      <section className={sectionContainer}>
        <div className="grid gap-12 px-4 py-4 md:grid-cols-2 md:px-6 md:pb-8 md:pt-6">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-6">
              <SectionSubHeader>내용 요약</SectionSubHeader>
              <article className="min-h-[80px]">
                {loading ? <LoadingDots /> : summary}
                {error && (
                  <ErrorMessage text="메일 분석 과정에서 문제가 발생했습니다." />
                )}
              </article>
            </div>
            <div className="flex flex-col gap-6">
              <SectionSubHeader>체크리스트</SectionSubHeader>
              <article className="min-h-[80px]">
                <ul className="flex flex-col gap-3">
                  {loading ? (
                    <LoadingDots />
                  ) : (
                    actionPointList.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckIcon className="h-6 w-6 shrink-0 p-1 text-grayBlue-400" />
                        <span>{item}</span>
                      </li>
                    ))
                  )}
                </ul>
              </article>
            </div>
          </div>
          <div className=" flex flex-col gap-6">
            <SectionSubHeader>답변 내용 선택</SectionSubHeader>
            <article className="min-h-[80px]">
              {loading ? (
                <LoadingDots />
              ) : (
                <AnswerPresetsToggleGroup
                  list={possibleAnswerList}
                  value={toggleActiveItem}
                  setValue={setToggleActiveItem}
                  setAnswer={setAnswer}
                />
              )}
            </article>
          </div>
        </div>
        <div className="flex justify-end border-t border-gray-200 p-6">
          <button
            onClick={handleMailCreation}
            className={button({ intent: 'secondary', size: 'md' })}
            disabled={answer.trim().length === 0}
          >
            <WandSVG className="h-4 w-4" />
            <span>메일 생성하기</span>
          </button>
        </div>
      </section>
    </div>
  )
}

export default ReceivedEmailAnalysisSection
