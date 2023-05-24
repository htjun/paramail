import { GetServerSidePropsContext } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import Meta from '@/components/Meta'
import { notoSansKR } from '@/lib/fonts'
import { twMerge } from 'tailwind-merge'
import { LandingPageNavigation } from '@/components/Navigation'
import { ctaButton, marketingPageTitle } from '@/styles/sharedClasses'
import Preview from 'public/preview.svg'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session)
    return {
      redirect: {
        destination: '/app',
        permanent: false,
      },
    }

  return { props: {} }
}

const LandingPage = () => {
  return (
    <>
      <Meta />
      <main
        className={twMerge(notoSansKR.className, 'flex min-h-[100vh] flex-col')}
      >
        <LandingPageNavigation />
        <div className="flex grow flex-col justify-between">
          <div className="flex grow flex-col items-center justify-center px-6 pb-8 pt-20 md:px-8">
            <div className="flex flex-col items-center">
              <div className="mb-12 flex flex-col items-center gap-6 md:gap-8">
                <h2 className="text-base font-medium tracking-tighter text-indigo-500 md:text-xl">
                  외국어 이메일 분석/작성 앱 파라메일
                </h2>
                <h1 className={twMerge(marketingPageTitle, 'max-w-[520px]')}>
                  이제 누구나 외국어 이메일을 읽고 쓸 수 있습니다
                </h1>
              </div>

              <Link
                href="/auth/signup"
                className={`${ctaButton} min-[400px]:w-auto`}
              >
                무료로 시작하기
              </Link>
            </div>
          </div>
          <div className="flex w-full overflow-x-hidden md:justify-center">
            <Preview className="ml-[-20px] w-full min-w-[900px] max-w-[1440px] sm:mx-auto" />
          </div>
        </div>
      </main>
    </>
  )
}

export default LandingPage
