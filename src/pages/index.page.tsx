import Link from 'next/link'
import { notoSansKR } from '@/lib/fonts'
import { twMerge } from 'tailwind-merge'
import { buttonClasses } from '@/styles/sharedClasses'
import ParamailLogo from 'public/paramail.svg'
import Preview from 'public/preview.svg'

const LandingPage = () => {
  return (
    <main
      className={twMerge(notoSansKR.className, 'flex min-h-[100vh] flex-col')}
    >
      <header className="flex h-16 shrink-0 items-center justify-between border-b px-4 md:h-20 md:px-8">
        <ParamailLogo className="w-16 text-indigo-600 md:w-20" />
        <div className="flex items-center gap-2 md:gap-4">
          <Link
            href="/login"
            className={twMerge(buttonClasses('ghost', 'md'), 'px-2 md:px-4')}
          >
            로그인
          </Link>
          <Link
            href="/signup"
            className="flex h-10 items-center justify-center rounded-full border border-indigo-300 px-3 font-medium text-indigo-500 transition-colors hover:border-indigo-500 hover:bg-indigo-500 hover:text-white md:h-12 md:px-4"
          >
            <span className="hidden md:inline-block">무료로&nbsp;</span>
            <span>시작하기</span>
          </Link>
        </div>
      </header>
      <div className="flex grow flex-col justify-between">
        <div className="flex grow flex-col items-center justify-center px-6 pb-8 pt-20 md:px-8">
          <div className="flex flex-col items-center">
            <div className="mb-12 flex flex-col items-center gap-6 md:gap-8">
              <h2 className="text-base font-medium tracking-tighter text-indigo-500 md:text-xl">
                외국어 이메일 분석/작성 앱 파라메일
              </h2>
              <h1 className="max-w-[520px] text-center text-4xl font-medium leading-tight tracking-tightest md:text-5xl md:leading-tight">
                이제 누구나 외국어 이메일을 읽고 쓸 수 있습니다
              </h1>
            </div>

            <Link
              href="/signup"
              className={`${buttonClasses('cta', 'lg')} min-[400px]:w-auto`}
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
  )
}

export default LandingPage
