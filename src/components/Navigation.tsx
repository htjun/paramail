import { ReactNode, MouseEvent } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { twMerge } from 'tailwind-merge'
import ParamailLogo from 'public/paramail.svg'
import { buttonClasses } from '@/styles/sharedClasses'

const Account = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') return null

  return (
    <div>
      {session && (
        <button
          type="button"
          onClick={() => signOut()}
          className={buttonClasses('ghost', 'sm')}
        >
          로그아웃
        </button>
      )}
    </div>
  )
}

interface NavigationProps {
  isInProgress?: boolean
  tabsTrigger?: ReactNode
}

const Navigation = ({
  isInProgress = false,
  tabsTrigger = null,
}: NavigationProps) => {
  const handleClickRestart = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    window.location.reload()
  }

  return (
    <header className="flex h-16 w-full items-center justify-between border-b bg-white px-4 md:px-8">
      <div className="flex items-center gap-8">
        <Link href="/app" className="group py-2">
          <ParamailLogo className="w-16 text-indigo-600 transition-colors group-hover:text-indigo-500 md:w-18" />
        </Link>
        {isInProgress ? (
          <button
            type="button"
            onClick={handleClickRestart}
            className={buttonClasses('secondary', 'sm')}
          >
            새로 시작
          </button>
        ) : (
          tabsTrigger
        )}
      </div>
      <Account />
    </header>
  )
}

export const LandingPageNavigation = ({
  page = '',
}: {
  page?: 'signup' | 'login' | ''
}) => {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b px-4 md:h-20 md:px-8">
      <Link href="/" className="group py-2">
        <ParamailLogo className="w-16 text-indigo-600 group-hover:text-indigo-500 md:w-20" />
      </Link>
      <div className="flex items-center gap-2 md:gap-4">
        {page !== 'login' && (
          <Link
            href="/login"
            className={twMerge(buttonClasses('ghost', 'md'), 'px-2 md:px-4')}
          >
            로그인
          </Link>
        )}
        {page !== 'signup' && (
          <Link
            href="/signup"
            className="flex h-10 items-center justify-center rounded-full border border-indigo-300 px-3 font-medium text-indigo-500 transition-colors hover:border-indigo-500 hover:bg-indigo-500 hover:text-white md:h-12 md:px-4"
          >
            <span className="hidden md:inline-block">무료로&nbsp;</span>
            <span>시작하기</span>
          </Link>
        )}
      </div>
    </header>
  )
}

export default Navigation
