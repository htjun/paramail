import type { Dispatch, SetStateAction } from 'react'
import Link from 'next/link'
import * as Dialog from '@radix-ui/react-dialog'
import { twMerge } from 'tailwind-merge'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { button } from '@/styles/button'
import { notoSansKR } from '@/lib/fonts'

interface CreditAlertModalProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const CreditAlertModal = ({ isOpen, setIsOpen }: CreditAlertModalProps) => (
  <Dialog.Root open={isOpen}>
    <Dialog.Portal>
      <Dialog.Overlay
        className="fixed inset-0 bg-black/70 data-[state=open]:animate-overlayShow"
        onClick={() => setIsOpen(false)}
      />
      <Dialog.Content
        className={twMerge(
          notoSansKR.className,
          'fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[400px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white p-6 shadow-2xl focus:outline-none data-[state=open]:animate-contentShow'
        )}
      >
        <Dialog.Title className="text-xl font-medium tracking-tight">
          크레딧이 부족합니다
        </Dialog.Title>
        <Dialog.Description className="mb-10 mt-2 text-base text-gray-500">
          사용하기 전에 크레딧을 충전해주세요.
        </Dialog.Description>
        <Link
          href="/app/settings/credit"
          className={twMerge(
            button({ intent: 'primary', size: 'md' }),
            'text-base'
          )}
        >
          충전하기
        </Link>

        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-[10px] top-[10px] inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-50 focus:outline-none"
          aria-label="Close"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)

export default CreditAlertModal
