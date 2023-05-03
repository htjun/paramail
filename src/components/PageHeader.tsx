interface PageHeaderProps {
  title: string
  description: string
}

const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div className="flex w-full flex-col items-center border-b border-gray-150 bg-white">
      <div className="border-bpx-4 w-full max-w-screen-xl px-4 py-6 md:px-12 md:py-10">
        <h1 className="mb-2.5 font-sansEng text-2xl font-extrabold tracking-tighter text-gray-700 md:text-4xl">
          {title}
        </h1>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
  )
}

export default PageHeader
