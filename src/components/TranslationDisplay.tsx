import SectionSubHeader from '@/components/SectionSubHeader'

const formatTextToParagraphs = (text: string) => {
  const textArray = text.split('\n\n')
  const paragraphs = textArray.map((text, index) => (
    <p key={index} className="py-2">
      {text}
    </p>
  ))
  return paragraphs
}

interface TranslationDisplayProps {
  original: string
  translated: string
}

const TranslationDisplay = ({
  original,
  translated,
}: TranslationDisplayProps) => {
  return (
    <section className="grid grid-cols-2 gap-12 rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex flex-col gap-6">
        <SectionSubHeader>원본</SectionSubHeader>
        <article className="text-gray-500">
          {formatTextToParagraphs(original)}
        </article>
      </div>
      <div className="flex flex-col gap-6">
        <SectionSubHeader>번역본</SectionSubHeader>
        <article>{formatTextToParagraphs(translated)}</article>
      </div>
    </section>
  )
}

export default TranslationDisplay
