import { useState } from 'react'
import SectionSubHeader from '@/components/SectionSubHeader'
import Button from '@/components/Button'
import { CheckIcon } from '@heroicons/react/20/solid'
import WandSVG from 'public/wand.svg'
import AnswerPresetsToggleGroup from './AnswerPresetsToggleGroup'

const textSeparator = (text: string) => {
  const summary = text.match(/Summary:\s*(.*?)\s*Action points:/)
  const actionPoints = text.match(
    /Action points:\s*([\s\S]*?)\s*Possible answers:/
  )
  const possibleAnswers = text.match(/Possible answers:\s*([\s\S]*)/)

  return {
    summary: summary?.[1],
    actionPoints: actionPoints?.[1],
    possibleAnswers: possibleAnswers?.[1],
  }
}

function processList(text: string) {
  const regex = /_\^/g
  const processedString = text?.replace(regex, '')
  const items =
    processedString?.split('\n').filter(item => item.trim() !== '') || []

  return items
}

interface AnalysisDisplayProps {
  text: string
}

const AnalysisDisplay = ({ text }: AnalysisDisplayProps) => {
  const { summary, actionPoints, possibleAnswers } = textSeparator(text)
  const [toggleActiveItem, setToggleActiveItem] = useState<number | null>(1)

  return (
    <section className="rounded-xl border border-gray-200 bg-white drop-shadow-xs">
      <div className="grid grid-cols-2 gap-12 p-6 pb-12">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-6">
            <SectionSubHeader>내용 요약</SectionSubHeader>
            <article>{summary}</article>
          </div>
          <div className="flex flex-col gap-6">
            <SectionSubHeader>체크리스트</SectionSubHeader>
            <article>
              <ul className="flex flex-col gap-3">
                {processList(actionPoints).map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <CheckIcon className="h-6 w-6 shrink-0 p-1 text-grayBlue-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
        <div className=" flex flex-col gap-6">
          <SectionSubHeader>답변 내용 선택</SectionSubHeader>
          <article>
            <AnswerPresetsToggleGroup
              list={processList(possibleAnswers)}
              value={toggleActiveItem}
              setValue={setToggleActiveItem}
            />
          </article>
        </div>
      </div>
      <div className="flex justify-end border-t border-gray-200 p-6">
        <Button
          label="메일 생성하기"
          onClick={() => {}}
          icon={<WandSVG className="h-4 w-4" />}
        />
      </div>
    </section>
  )
}

export default AnalysisDisplay
