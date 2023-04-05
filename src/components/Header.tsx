import { MouseEvent } from 'react'
import Button from '@/components/Button'
import ParamailLogo from 'public/paramail.svg'

const Header = ({ isInProgress = false }: { isInProgress?: boolean }) => {
  const handleClickRestart = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    window.location.reload()
  }
  return (
    <div className="flex h-9 items-center gap-6">
      <ParamailLogo />
      {isInProgress && (
        <Button
          label="새로 시작"
          variation="secondary"
          onClick={handleClickRestart}
        />
      )}
    </div>
  )
}

Header.defaultProps = {
  isInProgress: false,
}

export default Header
