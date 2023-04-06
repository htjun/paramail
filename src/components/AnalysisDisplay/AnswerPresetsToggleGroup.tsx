import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { CheckIcon } from '@heroicons/react/20/solid'

const AnswerPresetsToggleGroup = ({ list }) => {
  return (
    <ToggleGroup.Root
      className="flex flex-col gap-3"
      type="single"
      defaultValue="answer-0"
      aria-label="Text alignment"
      orientation="vertical"
    >
      {list.map((item, i) => (
        <ToggleGroup.Item
          value={`answer-${i}`}
          tabIndex={i}
          className="group rounded-xl bg-gray-200 p-0.5 text-gray-500 transition-colors hover:bg-gray-300 focus:bg-suit focus:outline-none data-[state=on]:bg-suit data-[state=on]:text-blue-850"
        >
          <div className="flex items-start justify-between gap-6 rounded-[10px] bg-white p-4 text-left outline outline-white transition-all duration-75 ease-linear hover:outline-gray-300 group-data-[state=on]:bg-blue-25 group-data-[state=on]:outline-none">
            <span>{item}</span>
            <CheckIcon className="h-6 w-6 shrink-0 rounded-full border border-gray-200 bg-white p-1 text-white group-data-[state=on]:border-blue-850 group-data-[state=on]:bg-blue-850" />
          </div>
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  )
}

export default AnswerPresetsToggleGroup
