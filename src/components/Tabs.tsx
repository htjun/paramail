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
      className="flex h-9 gap-0.5 rounded-full bg-gray-50 shadow-[inset_0_0_0_1px_#E9EBEF]"
    >
      {items.map(item => (
        <TabsPrimitive.Trigger
          key={item.value}
          value={item.value}
          className="h-9 rounded-full border border-transparent px-3 text-sm font-medium tracking-tight text-gray-400 transition-colors hover:text-gray-800 data-[state=active]:border-slate-300 data-[state=active]:bg-white data-[state=active]:text-gray-800 data-[state=active]:shadow-md sm:px-5"
        >
          {item.label}
        </TabsPrimitive.Trigger>
      ))}
    </TabsPrimitive.List>
  )
}
