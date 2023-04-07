import SectionHeader from '@/components/SectionHeader'
import SectionSubHeader from '@/components/SectionSubHeader'
import Button from '@/components/Button'
import formatTextToParagraphs from '@/utils/formatTextToParagraphs'
import { DocumentDuplicateIcon } from '@heroicons/react/20/solid'
import useEmailCreation from '@/hooks/useEmailCreation'
import useTranslate from '@/hooks/useTranslation'

const CreatedEmailSection = ({ receivedEmailValue, answerSummary }) => {
  const {
    loading: emailCreationLoading,
    error: emailCreationError,
    data = '',
  } = useEmailCreation({ receivedEmailValue, answerSummary })
  const {
    loading: translationLoading,
    error: translationError,
    translatedText,
  } = useTranslate(data)

  if (emailCreationLoading) return <div>Loading...</div>
  if (emailCreationError) return <div>Error</div>

  const handleCopyToClipboard = () => {}
  return (
    <div className="my-10">
      <SectionHeader
        title="메일 생성 & 수정"
        description="AI가 생성한 메일을 확인 및 수정한 후, 복사하여 원하는 곳에 붙여넣기 하세요."
      />
      <section className="rounded-xl border border-gray-200 bg-white drop-shadow-xs">
        <div className="grid grid-cols-2 gap-12 p-6 pb-12">
          <div className="flex flex-col gap-6">
            <SectionSubHeader>원본</SectionSubHeader>
            <article>
              {formatTextToParagraphs(data).map((paragraph, index) => (
                <p key={index} className="py-2">
                  {paragraph}
                </p>
              ))}
            </article>
          </div>
          <div className="flex flex-col gap-6">
            <SectionSubHeader>번역본</SectionSubHeader>
            <article className="text-gray-500">
              {formatTextToParagraphs(translatedText).map(
                (paragraph, index) => (
                  <p key={index} className="py-2">
                    {paragraph}
                  </p>
                )
              )}
            </article>
          </div>
        </div>
        <div className="flex justify-end border-t border-gray-200 p-6">
          <Button
            label="원본 복사하기"
            onClick={handleCopyToClipboard}
            icon={<DocumentDuplicateIcon className="h-4 w-4" />}
          />
        </div>
      </section>
    </div>
  )
}

export default CreatedEmailSection
