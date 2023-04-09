import { ReactNode } from 'react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { CheckIcon } from '@heroicons/react/20/solid'

interface ToggleGroupItemProps {
  value: string
  children: ReactNode
  tabIndex: number
  onClick?: () => void
}

const ToggleGroupItem = ({
  value,
  children,
  tabIndex,
  onClick,
}: ToggleGroupItemProps) => {
  return (
    <ToggleGroup.Item
      value={value}
      tabIndex={tabIndex}
      className="group rounded-xl bg-gray-200 p-0.5 text-gray-500 transition-colors hover:bg-gray-300 focus:bg-suit focus:outline-none data-[state=on]:bg-suit data-[state=on]:text-blue-850"
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-6 rounded-[10px] bg-white p-4 text-left transition-all duration-75 ease-linear group-data-[state=on]:bg-blue-25 group-data-[state=on]:outline-none">
        <span className="flex w-full">{children}</span>
        <CheckIcon className="h-[22px] w-[22px] shrink-0 rounded-full border-2 border-gray-200 bg-white p-0.5 text-white group-data-[state=on]:border-blue-850 group-data-[state=on]:bg-blue-850" />
      </div>
    </ToggleGroup.Item>
  )
}

ToggleGroupItem.defaultProps = {
  onClick: () => {},
}

export default ToggleGroupItem
