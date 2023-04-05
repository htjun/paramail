import SectionSubHeader from '@/components/SectionSubHeader'
import { CheckIcon } from '@heroicons/react/20/solid'

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
  const processedString = text.replace(regex, '')
  const items = processedString.split('\n').filter(item => item.trim() !== '')

  return items
}

interface AnalysisDisplayProps {
  text: string
}

const AnalysisDisplay = ({ text }: AnalysisDisplayProps) => {
  const { summary, actionPoints, possibleAnswers } = textSeparator(text)

  return (
    <section className="drop-shadow- grid grid-cols-2 gap-12 rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-6">
          <SectionSubHeader>내용 요약</SectionSubHeader>
          <article>{summary}</article>
        </div>
        <div className="flex flex-col gap-6">
          <SectionSubHeader>체크리스트</SectionSubHeader>
          <article>
            <ul className="flex flex-col gap-2">
              {processList(actionPoints).map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-grayBlue-400" />
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
          <ul>
            {processList(possibleAnswers).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  )
}

export default AnalysisDisplay
