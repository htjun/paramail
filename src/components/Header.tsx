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
    <div className="flex h-9 items-center gap-8">
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
  )
}

Header.defaultProps = {
  isInProgress: false,
}

export default Header
