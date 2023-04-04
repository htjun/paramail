import SectionSubHeader from '@/components/SectionSubHeader'

interface AnalysisDisplayProps {
  summary: string
}

const AnalysisDisplay = ({ summary }: AnalysisDisplayProps) => {
  return (
    <section className="drop-shadow- grid grid-cols-2 gap-12 rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex flex-col gap-6">
        <SectionSubHeader>내용 요약</SectionSubHeader>
        <article>{summary}</article>
      </div>
      <div className="flex flex-col gap-6">
        <SectionSubHeader>답변 내용 선택</SectionSubHeader>
        <article></article>
      </div>
      <div className="flex flex-col gap-6">
        <SectionSubHeader>할일 목록</SectionSubHeader>
        <article></article>
      </div>
    </section>
  )
}

export default AnalysisDisplay
