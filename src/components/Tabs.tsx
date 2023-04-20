import * as TabsPrimitive from '@radix-ui/react-tabs'

export const TabsRoot = TabsPrimitive.Root
export const TabsContent = TabsPrimitive.Content

interface TabsTriggerProps {
  items: { value: string; label: string }[]
}

export const TabsTrigger = ({ items }: TabsTriggerProps) => {
  return (
    <TabsPrimitive.List
      aria-label="tabs"
      className="flex gap-0.5 rounded-lg border border-gray-200 bg-gray-50 p-0.5"
    >
      {items.map(item => (
        <TabsPrimitive.Trigger
          key={item.value}
          value={item.value}
          className="h-8 w-20 rounded-md text-sm font-medium tracking-tight text-gray-400 transition-colors hover:text-gray-800 data-[state=active]:bg-white  data-[state=active]:text-gray-800 data-[state=active]:shadow-sm"
        >
          {item.label}
        </TabsPrimitive.Trigger>
      ))}
    </TabsPrimitive.List>
  )
}
