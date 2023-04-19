import { ReactNode, MouseEvent } from 'react'
import Button from '@/components/Button'
import ParamailLogo from 'public/paramail.svg'

interface HeaderProps {
  isInProgress?: boolean
  tabsTrigger: ReactNode
}

const Header = ({ isInProgress = false, tabsTrigger }: HeaderProps) => {
  const handleClickRestart = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    window.location.reload()
  }

  return (
    <header className="flex h-9 w-full items-center justify-between border-b bg-white px-6 py-8">
      <div className="flex items-center gap-9">
        <ParamailLogo />
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
    </header>
  )
}

Header.defaultProps = {
  isInProgress: false,
}

export default Header
