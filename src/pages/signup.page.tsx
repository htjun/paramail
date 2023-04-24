import Meta from '@/components/Meta'
import { useSession, signIn } from 'next-auth/react'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { LandingPageNavigation } from '@/components/Navigation'
import { sectionContainer, buttonClasses } from '@/styles/sharedClasses'

const SignUpItem = ({ method, label }) => {
  const handleClick = e => {
    e.preventDefault()
    signIn(method, { callbackUrl: '/app' })
  }
  return (
    <button
      type="button"
      onClick={handleClick}
      className={twMerge(buttonClasses('secondary', 'md'), 'w-full')}
    >
      {label}
    </button>
  )
}

const SignUpPage = () => {
  const { data: session } = useSession()

  return (
    <>
      <Meta title="계정 만들기" />
      <main>
        <LandingPageNavigation page="signup" />
        <div className="flex w-full flex-col items-center justify-center px-4 py-12">
          <div
            className={twMerge(
              sectionContainer,
              'flex w-full max-w-lg flex-col gap-6 px-6 py-8'
            )}
          >
            {!session ? (
              <>
                <h2 className="flex items-center gap-2 text-gray-600">
                  <UserCircleIcon className="h-6 w-6 text-gray-400" />
                  <span>원하시는 가입 방식을 선택하세요</span>
                </h2>
                <div className="flex flex-col gap-3">
                  <SignUpItem method="google" label="구글" />
                  <SignUpItem method="facebook" label="페이스북" />
                </div>
              </>
            ) : (
              <>로그인 되었습니다.</>
            )}
            <div className="my-2 text-center">
              <Link
                href="/privacy-policy"
                className="text-sm text-gray-500 underline hover:text-gray-700"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default SignUpPage
