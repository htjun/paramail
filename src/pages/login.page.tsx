import { useSession, signIn } from 'next-auth/react'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { sectionContainer, buttonClasses } from '@/styles/sharedClasses'
import ParamailLogo from 'public/paramail.svg'

const LoginItem = ({ method, label }) => {
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

const LoginPage = () => {
  const { data: session } = useSession()

  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between border-b px-4 md:h-20 md:px-8">
        <Link href="/" className="group py-2">
          <ParamailLogo className="w-16 text-indigo-600 group-hover:text-indigo-500 md:w-20" />
        </Link>
      </header>
      <main className="flex w-full flex-col items-center justify-center px-4 py-12">
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
                <span>원하시는 로그인 방식을 선택하세요</span>
              </h2>
              <div className="flex flex-col gap-3">
                <LoginItem method="google" label="구글" />
                <LoginItem method="facebook" label="페이스북" />
              </div>
            </>
          ) : (
            <>로그인 되었습니다.</>
          )}
        </div>
      </main>
    </>
  )
}

export default LoginPage
