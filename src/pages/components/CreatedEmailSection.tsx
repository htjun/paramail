import SectionHeader from '@/components/SectionHeader'
import SectionSubHeader from '@/components/SectionSubHeader'
import Button from '@/components/Button'
import LoadingDots from '@/components/LoadingDots'
import ErrorMessage from '@/components/ErrorMessage'
import formatTextToParagraphs from '@/utils/formatTextToParagraphs'
import { DocumentDuplicateIcon } from '@heroicons/react/20/solid'
import useEmailCreation from '@/hooks/useEmailCreation'
import useTranslate from '@/hooks/useTranslation'
import useCopyToClipboard from '@/hooks/useCopyToClipboard'

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
  const [copyToClipboard, { success }]: any = useCopyToClipboard()

  const handleCopyToClipboard = () => {
    copyToClipboard(formatTextToParagraphs(data).join('\n\n'), {
      format: 'text/plain',
    })
  }
  return (
    <div className="flex flex-col gap-8">
      <SectionHeader
        title="메일 생성 & 수정"
        description="AI가 생성한 메일을 확인 및 수정한 후, 복사하여 원하는 곳에 붙여넣기 하세요."
      />
      <section className="rounded-xl border border-gray-200 bg-white drop-shadow-xs">
        <div className="grid min-h-[400px] grid-cols-2 gap-12 p-6 pb-12">
          <div className="flex flex-col gap-6">
            <SectionSubHeader>원본</SectionSubHeader>
            <article>
              {emailCreationLoading ? (
                <LoadingDots />
              ) : (
                formatTextToParagraphs(data).map((paragraph, index) => (
                  <p key={index} className="py-2">
                    {paragraph}
                  </p>
                ))
              )}
              {emailCreationError && (
                <ErrorMessage text="메일 생성 과정에서 문제가 발생했습니다." />
              )}
            </article>
          </div>
          <div className="flex flex-col gap-6">
            <SectionSubHeader>번역본</SectionSubHeader>
            <article className="text-gray-500">
              {emailCreationLoading || translationLoading ? (
                <LoadingDots />
              ) : (
                formatTextToParagraphs(translatedText).map(
                  (paragraph, index) => (
                    <p key={index} className="py-2">
                      {paragraph}
                    </p>
                  )
                )
              )}
              {translationError && (
                <ErrorMessage text="생성된 메일을 번역하는 과정에서 문제가 발생했습니다." />
              )}
            </article>
          </div>
        </div>
        <div className="flex items-center justify-end border-t border-gray-200 p-6">
          {success && (
            <p className="mr-4 text-sm text-gray-500">복사되었습니다.</p>
          )}
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
