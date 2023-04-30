import { ReactNode } from 'react'

const SectionSubHeader = ({ children }: { children: ReactNode }) => {
  return (
    <h2 className="flex items-center gap-3 border-b border-gray-200 pb-4 text-sm font-medium text-gray-700">
      {children}
    </h2>
  )
}

export default SectionSubHeader
