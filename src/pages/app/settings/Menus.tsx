import { ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  UserIcon,
  CircleStackIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline'

interface SettingsMenuItemProps {
  children: ReactNode
  href: string
}

const SettingsMenuItem = ({
  children,
  href,
  ...rest
}: SettingsMenuItemProps) => {
  const router = useRouter()
  const isActive = router.pathname === href

  return (
    <Link
      href={href}
      {...rest}
      className="flex items-center gap-3 rounded-lg p-2 font-medium tracking-tight transition-all hover:bg-gray-100 data-[active=true]:bg-gray-100"
      data-active={isActive}
    >
      {children}
    </Link>
  )
}

const SettingsMenus = () => {
  const basePath = '/app/settings'
  return (
    <div className="flex shrink-0 flex-col gap-1 border-b p-2 md:w-56 md:border-b-0 md:border-r md:px-4 md:py-6">
      <SettingsMenuItem href={basePath}>
        <UserIcon className="h-5 w-5" />
        <span>내 정보</span>
      </SettingsMenuItem>
      <SettingsMenuItem href={`${basePath}/credit`}>
        <CircleStackIcon className="h-5 w-5" />
        <span>크레딧 충전</span>
      </SettingsMenuItem>
      <SettingsMenuItem href={`${basePath}/preference`}>
        <AdjustmentsHorizontalIcon className="h-5 w-5" />
        <span>앱 설정</span>
      </SettingsMenuItem>
    </div>
  )
}

export default SettingsMenus
