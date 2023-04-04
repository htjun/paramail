const SectionSubHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <h2 className="border-b border-gray-200 pb-4 text-sm font-medium text-gray-700">
      {children}
    </h2>
  )
}

export default SectionSubHeader
