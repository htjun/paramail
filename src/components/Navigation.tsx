import { ReactNode, MouseEvent } from 'react'
import Link from 'next/link'
import Button from '@/components/Button'
import ParamailLogo from 'public/paramail.svg'

const Account = () => {
  return (
    <Link
      href="/login"
      className="flex h-9 items-center rounded-lg bg-white px-3.5 text-sm font-medium text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900"
    >
      로그인
    </Link>
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
    <header className="flex h-9 w-full items-center justify-between border-b bg-white px-6 py-8">
      <div className="flex items-center gap-9">
        <Link href="/app">
          <ParamailLogo />
        </Link>
        {isInProgress ? (
          <Button
            label="새로 시작"
            variation="secondary"
            onClick={handleClickRestart}
          />
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
