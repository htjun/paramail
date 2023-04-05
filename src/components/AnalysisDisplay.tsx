import SectionSubHeader from '@/components/SectionSubHeader'
import formatTextToParagraphs from '@/utils/formatTextToParagraphs'

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

interface AnalysisDisplayProps {
  text: string
}

const AnalysisDisplay = ({ text }: AnalysisDisplayProps) => {
  const { summary, actionPoints, possibleAnswers } = textSeparator(text)

  return (
    <section className="drop-shadow- grid grid-cols-2 gap-12 rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex flex-col gap-6">
        <SectionSubHeader>내용 요약</SectionSubHeader>
        <article>{summary}</article>
      </div>
      <div className="flex flex-col gap-6">
        <SectionSubHeader>답변 내용 선택</SectionSubHeader>
        <article>{possibleAnswers}</article>
      </div>
      <div className="flex flex-col gap-6">
        <SectionSubHeader>할일 목록</SectionSubHeader>
        <article>{actionPoints}</article>
      </div>
    </section>
  )
}

export default AnalysisDisplay
