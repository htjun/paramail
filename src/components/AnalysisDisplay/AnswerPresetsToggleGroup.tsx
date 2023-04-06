import * as ToggleGroup from '@radix-ui/react-toggle-group'
import useAutoHeightTextArea from '@/hooks/useAutoHeightTextArea'
import ToggleGroupItem from './ToggleGroupItem'

const AnswerPresetsToggleGroup = ({ list, value, setValue, setAnswer }) => {
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
        if (newValue) {
          setValue(newValue)
          if (newValue <= numberOfItems) {
            setAnswer(list[Number(newValue) - 1])
          }
        }
      }}
    >
      {list.map((item, i) => (
        <ToggleGroupItem value={i + 1} tabIndex={i}>
          {item}
        </ToggleGroupItem>
      ))}
      <ToggleGroupItem
        value={numberOfItems + 1}
        tabIndex={numberOfItems}
        onClick={() => {
          textAreaRef.current?.focus()
          setAnswer(textAreaRef.current?.value)
        }}
      >
        <textarea
          ref={textAreaRef}
          placeholder="직접 작성하기"
          className="w-full resize-none focus:outline-none group-data-[state=on]:bg-blue-25"
          rows={1}
          onChange={e => {
            setAnswer(e.target.value)
          }}
        />
      </ToggleGroupItem>
    </ToggleGroup.Root>
  )
}

export default AnswerPresetsToggleGroup
