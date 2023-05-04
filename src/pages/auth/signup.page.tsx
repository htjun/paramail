import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { twMerge } from 'tailwind-merge'
import Meta from '@/components/Meta'
import { LandingPageNavigation } from '@/components/Navigation'
import { sectionContainer, textLink } from '@/styles/sharedClasses'
import OAuthButton from './OAuthButton'

const SignUpPage = () => {
  const router = useRouter()
  const { isLoading, session } = useSessionContext()

  useEffect(() => {
    if (!isLoading && session) {
      router.replace('/app')
    }
  }, [isLoading, session])

  if (isLoading) return null

  return (
    <>
      <Meta title="계정 만들기" />
      <main>
        <LandingPageNavigation clean />
        <div className="flex w-full flex-col items-center justify-center px-4 py-12">
          <div
            className={twMerge(
              sectionContainer,
              'flex w-full max-w-lg flex-col gap-10 px-6 py-8'
            )}
          >
            <div className="flex flex-col gap-2">
              <h1 className="flex items-center gap-1.5 text-xl font-medium tracking-tight text-gray-700">
                <span>계정 만들기</span>
              </h1>
              <p className=" text-gray-500">
                원하시는 계정 생성 방식을 선택하세요
              </p>
            </div>
            <hr />
            <div className="flex flex-col gap-3">
              <OAuthButton method="google" label="구글" />
              <OAuthButton method="facebook" label="페이스북" />
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">이미 계정이 있으신가요?</span>
              <Link href="/auth/login" className={textLink}>
                로그인 하세요
              </Link>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center">
          <div className="text-gray-450 max-w-sm text-center text-sm leading-relaxed tracking-tight">
            계정 생성 또는 로그인 시{' '}
            <Link href="/terms" target="_blank" className={textLink}>
              서비스 약관
            </Link>{' '}
            및{' '}
            <Link href="/privacy" target="_blank" className={textLink}>
              개인정보 처리방침
            </Link>
            과 서비스 운영 관련 이메일 수신에 동의하는 것으로 간주합니다.
          </div>
        </div>
      </main>
    </>
  )
}

export default SignUpPage
