import { ReactNode, MouseEvent } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
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

const Navigation = ({ isInProgress = false, tabsTrigger }: NavigationProps) => {
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

Navigation.defaultProps = {
  isInProgress: false,
  tabsTrigger: null,
}

export default Navigation
