import { DocumentDuplicateIcon } from '@heroicons/react/20/solid'
import SectionHeader from '@/components/SectionHeader'
import SectionSubHeader from '@/components/SectionSubHeader'
import LoadingDots from '@/components/LoadingDots'
import ErrorMessage from '@/components/ErrorMessage'
import Tooltip from '@/components/Tooltip'
import formatTextToParagraphs from '@/utils/formatTextToParagraphs'
import useEmailCreation from '@/hooks/useEmailCreation'
import useTranslate from '@/hooks/useTranslation'
import useCopyToClipboard from '@/hooks/useCopyToClipboard'
import { buttonClasses } from '@/styles/sharedClasses'

interface CreatedEmailSectionProps {
  receivedEmailValue?: string
  answerSummary?: string
  newEmailValue?: {
    sender: string
    recipient: string
    content: string
  }
}

const CreatedEmailSection = ({
  receivedEmailValue,
  answerSummary,
  newEmailValue,
}: CreatedEmailSectionProps) => {
  const {
    loading: emailCreationLoading,
    error: emailCreationError,
    data = '',
  } = useEmailCreation({ receivedEmailValue, answerSummary, newEmailValue })
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
        title="메일 생성 & 복사"
        description="AI가 생성한 메일을 확인하고 복사하여 원하는 곳에 붙여넣기 하세요."
      />
      <section className="rounded-xl border border-gray-200 bg-white shadow-xs">
        <div className="grid min-h-[400px] gap-12 px-4 py-4 md:grid-cols-2 md:px-6 md:pb-8 md:pt-6">
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
            <SectionSubHeader>
              <div>번역본</div>
              <div className="flex items-center gap-0.5 font-normal text-gray-450">
                <span>내용 확인용으로만 참고해주세요</span>
                <Tooltip content="번역 품질이 좋지 않을 수 있으므로 내용 확인용으로만 참고해주세요. 원본은 최대한 자연스러운 영어로 작성되었습니다." />
              </div>
            </SectionSubHeader>
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
          <button
            onClick={handleCopyToClipboard}
            className={buttonClasses('primary', 'md')}
          >
            <DocumentDuplicateIcon className="h-4 w-4" />
            <span>원본 복사하기</span>
          </button>
        </div>
      </section>
    </div>
  )
}

export default CreatedEmailSection
