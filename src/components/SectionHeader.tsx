const SectionHeader = ({
  title,
  description,
}: {
  title: string
  description: string
}) => {
  return (
    <div className="my-12 flex flex-col gap-1.5">
      <h1 className="text-lg font-medium tracking-tighter">{title}</h1>
      <p className="text-sm opacity-50">{description}</p>
    </div>
  )
}

export default SectionHeader
