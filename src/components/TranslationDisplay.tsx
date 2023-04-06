import SectionSubHeader from '@/components/SectionSubHeader'
import formatTextToParagraphs from '@/utils/formatTextToParagraphs'

interface TranslationDisplayProps {
  original: string
  translated: string
}

const TranslationDisplay = ({
  original,
  translated,
}: TranslationDisplayProps) => {
  return (
    <section className="drop-shadow- grid grid-cols-2 gap-12 rounded-xl border border-gray-200 bg-white px-6 pb-8 pt-6">
      <div className="flex flex-col gap-6">
        <SectionSubHeader>원본</SectionSubHeader>
        <article className="text-gray-500">
          {formatTextToParagraphs(original).map((paragraph, index) => (
            <p key={index} className="py-2">
              {paragraph}
            </p>
          ))}
        </article>
      </div>
      <div className="flex flex-col gap-6">
        <SectionSubHeader>번역본</SectionSubHeader>
        <article>
          {formatTextToParagraphs(translated).map((paragraph, index) => (
            <p key={index} className="py-2">
              {paragraph}
            </p>
          ))}
        </article>
      </div>
    </section>
  )
}

export default TranslationDisplay
