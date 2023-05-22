import { MouseEvent } from 'react'
import Link from 'next/link'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import * as Popover from '@radix-ui/react-popover'
import { twMerge } from 'tailwind-merge'
import { XMarkIcon, ChevronDownIcon, UserIcon } from '@heroicons/react/20/solid'
import { button } from '@/styles/button'
import { type UserProfileProps } from '@/hooks/useUserProfile'
import useCredit from '@/hooks/useCredit'

const AccountMenu = ({ user }: { user: UserProfileProps }) => {
  const supabase = useSupabaseClient()
  const credit = useCredit()

  const handleSignOut = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await supabase.auth.signOut()
  }

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className="flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full border border-gray-250 text-sm font-medium text-gray-500 ring-offset-2 transition-all hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:w-auto sm:pl-4 sm:pr-3"
          aria-label="Account menu"
        >
          <span className="hidden shrink-0 sm:block">{user.full_name}</span>
          <ChevronDownIcon className="hidden h-4 w-4 shrink-0 sm:block" />
          <UserIcon className="block h-4 w-4 shrink-0 sm:hidden" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="w-52 rounded border bg-white py-3 shadow-lg will-change-[transform,opacity]"
          collisionPadding={20}
          sideOffset={2}
        >
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex flex-col gap-1 px-5 py-2">
              <div>{user.full_name}</div>
              <div className="text-gray-400">{user.email}</div>
              <hr className="my-3 border-gray-100" />
              <div className="flex items-center justify-between gap-2">
                <div>
                  <span className="text-gray-600">크레딧: </span>
                  <span className="font-medium">
                    {credit?.toLocaleString('ko-KR')}
                  </span>
                </div>
                <Link
                  href="/app/settings/credit"
                  className="rounded-full border border-indigo-300 px-3 py-1 font-medium text-indigo-500 transition-all hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-700"
                >
                  충전
                </Link>
              </div>
            </div>
            <hr className="x-full h-px border-gray-200" />
            <div className="flex flex-col gap-1 px-1.5">
              <Link
                href="/app/settings"
                className={twMerge(
                  button({ intent: 'ghost', size: 'sm' }),
                  'w-full justify-start'
                )}
              >
                계정 설정
              </Link>
              <button
                onClick={handleSignOut}
                className={twMerge(
                  button({ intent: 'ghost', size: 'sm' }),
                  'w-full justify-start'
                )}
              >
                로그아웃
              </button>
            </div>
          </div>
          <Popover.Close
            className="absolute right-[5px] top-[5px] inline-flex cursor-default items-center justify-center rounded-full outline-none"
            aria-label="Close"
          >
            <XMarkIcon className="h-7 w-7 rounded-full p-1 text-gray-500 hover:bg-gray-100" />
          </Popover.Close>
          <Popover.Arrow
            width={19}
            height={10}
            className="relative left-[1.5px] fill-gray-200"
          />
          <Popover.Arrow width={16} height={8} className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default AccountMenu
