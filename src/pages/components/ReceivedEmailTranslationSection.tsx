import { twMerge } from 'tailwind-merge'
import SectionHeader from '@/components/SectionHeader'
import SectionSubHeader from '@/components/SectionSubHeader'
import LoadingDots from '@/components/LoadingDots'
import ErrorMessage from '@/components/ErrorMessage'
import formatTextToParagraphs from '@/utils/formatTextToParagraphs'
import { sectionContainer } from '@/styles/sharedClasses'
import useTranslate from '@/hooks/useTranslation'

const ReceivedEmailTranslationSection = ({ emailInput }) => {
  const { loading, error, translatedText } = useTranslate(emailInput)

  return (
    <>
      <SectionHeader
        title="메일 번역"
        description="받은 메일의 한국어 번역본을 확인하세요."
      />
      <section
        className={twMerge(
          sectionContainer,
          'grid grid-cols-2 gap-12 px-6 pb-8 pt-6 '
        )}
      >
        <div className="flex flex-col gap-6">
          <SectionSubHeader>원본</SectionSubHeader>
          <article className="text-gray-500">
            {formatTextToParagraphs(emailInput).map((paragraph, index) => (
              <p key={index} className="my-4">
                {paragraph}
              </p>
            ))}
          </article>
        </div>
        <div className="flex flex-col gap-6">
          <SectionSubHeader>번역본</SectionSubHeader>
          <article>
            {loading && <LoadingDots />}
            {error && (
              <ErrorMessage text="번역이 올바르게 처리되지 않았습니다." />
            )}
            {formatTextToParagraphs(translatedText).map((paragraph, index) => (
              <p key={index} className="my-4">
                {paragraph}
              </p>
            ))}
          </article>
        </div>
      </section>
    </>
  )
}

export default ReceivedEmailTranslationSection
