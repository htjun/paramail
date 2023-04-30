import { MouseEvent } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import * as Popover from '@radix-ui/react-popover'
import { twMerge } from 'tailwind-merge'
import { XMarkIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { buttonClasses } from '@/styles/sharedClasses'

const AccountMenu = ({ user }: { user: any }) => {
  const { user_metadata: userData } = user
  const supabase = useSupabaseClient()

  const handleSignOut = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await supabase.auth.signOut()
  }

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className="flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg px-1 text-sm font-medium text-gray-500 ring-offset-2 transition-all hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:px-3.5"
          aria-label="Account menu"
        >
          <span className="hidden shrink-0 sm:block">{userData.name}</span>
          <span className="block shrink-0 sm:hidden">내 계정</span>
          <ChevronDownIcon className="h-4 w-4" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="w-52 rounded border bg-white py-3 shadow-lg will-change-[transform,opacity]"
          collisionPadding={20}
          sideOffset={0}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1 px-5 py-2">
              <div className="text-sm">{userData.name}</div>
              <div className="text-sm text-gray-400">{userData.email}</div>
            </div>
            <hr className="x-full h-px border-gray-200" />
            <div className="px-1.5">
              <button
                onClick={handleSignOut}
                className={twMerge(
                  buttonClasses('ghost', 'sm'),
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
