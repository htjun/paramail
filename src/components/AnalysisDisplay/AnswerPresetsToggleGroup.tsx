import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { CheckIcon } from '@heroicons/react/20/solid'
import useAutoHeightTextArea from '@/hooks/useAutoHeightTextArea'

const ToggleGroupItem = ({ value, children, tabIndex }) => {
  return (
    <ToggleGroup.Item
      value={value}
      tabIndex={tabIndex}
      className="group rounded-xl bg-gray-200 p-0.5 text-gray-500 transition-colors hover:bg-gray-300 focus:bg-suit focus:outline-none data-[state=on]:bg-suit data-[state=on]:text-blue-850"
    >
      <div className="flex items-start justify-between gap-6 rounded-[10px] bg-white p-4 text-left outline outline-white transition-all duration-75 ease-linear hover:outline-gray-300 group-data-[state=on]:bg-blue-25 group-data-[state=on]:outline-none">
        <span className="flex w-full">{children}</span>
        <CheckIcon className="h-[22px] w-[22px] shrink-0 rounded-full border border-gray-200 bg-white p-1 text-white group-data-[state=on]:border-blue-850 group-data-[state=on]:bg-blue-850" />
      </div>
    </ToggleGroup.Item>
  )
}

const AnswerPresetsToggleGroup = ({ list, value, setValue }) => {
  const textAreaRef = useAutoHeightTextArea()
  const numberOfItems = list.length

  return (
    <ToggleGroup.Root
      className="flex flex-col gap-3"
      type="single"
      defaultValue={value}
      aria-label="Text alignment"
      orientation="vertical"
      value={value}
      onValueChange={newValue => {
        if (newValue) setValue(newValue)
      }}
    >
      {list.map((item, i) => (
        <ToggleGroupItem value={i + 1} tabIndex={i}>
          {item}
        </ToggleGroupItem>
      ))}
      <ToggleGroupItem value={numberOfItems + 1} tabIndex={numberOfItems}>
        <textarea
          ref={textAreaRef}
          placeholder="직접 작성하기"
          className="w-full resize-none focus:outline-none group-data-[state=on]:bg-blue-25"
          rows={1}
        />
      </ToggleGroupItem>
    </ToggleGroup.Root>
  )
}

export default AnswerPresetsToggleGroup
