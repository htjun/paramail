import Link from 'next/link'
import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@heroicons/react/20/solid'
import { textLink } from '@/styles/sharedClasses'

interface TermsAgreeCheckboxProps {
  checked: boolean
  setChecked: (checked: boolean) => void
}

const TermsAgreeCheckbox = ({
  checked,
  setChecked,
}: TermsAgreeCheckboxProps) => {
  return (
    <div className="flex items-center gap-4 rounded border bg-gray-25 p-4 text-sm">
      <Checkbox.Root
        checked={checked}
        onCheckedChange={setChecked}
        className="flex h-6 w-6 shrink-0 appearance-none items-center justify-center rounded border-2 border-gray-400 bg-white hover:border-indigo-500 data-[state=checked]:border-indigo-500 data-[state=checked]:bg-indigo-500"
      >
        <Checkbox.Indicator className="">
          {checked === true && <CheckIcon className="h-4 w-4 text-white" />}
        </Checkbox.Indicator>
      </Checkbox.Root>
      <div className="leading-relaxed tracking-tight text-gray-500">
        Paramail의{' '}
        <Link href="/terms" target="_blank" className={textLink}>
          서비스 약관
        </Link>{' '}
        및{' '}
        <Link href="/privacy" target="_blank" className={textLink}>
          개인정보 처리방침
        </Link>
        과 서비스 운영과 관련된 이메일을 수신하는 데 동의합니다.
      </div>
    </div>
  )
}

export default TermsAgreeCheckbox
