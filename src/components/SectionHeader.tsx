const SectionHeader = ({
  title,
  description,
}: {
  title: string
  description: string
}) => {
  return (
    <div className="flex flex-col gap-1.5 px-4 md:px-0">
      <h1 className="text-lg font-medium tracking-tighter">{title}</h1>
      <p className="text-sm opacity-50">{description}</p>
    </div>
  )
}

export default SectionHeader
