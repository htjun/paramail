import * as Popover from '@radix-ui/react-popover'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

const Tooltip = ({ content }: { content: string }) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <InformationCircleIcon className="my-[-6px] h-8 w-8 rounded p-1.5 text-gray-500 hover:bg-gray-100" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="w-full max-w-[300px] rounded border bg-white p-4 shadow-lg will-change-[transform,opacity]"
          collisionPadding={20}
          side="top"
          sideOffset={0}
        >
          <div className="text-sm text-gray-600">{content}</div>
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

export default Tooltip
