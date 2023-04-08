import SectionHeader from '@/components/SectionHeader'

const NewMailFlow = () => {
  return (
    <div className="flex flex-col gap-8">
      <SectionHeader
        title="새 메일 내용 입력"
        description="작성할 메일의 내용을 한글로 간략히 입력해 주세요."
      />
      <form className="flex flex-col gap-10">
        <div className="flex w-full max-w-xs flex-col gap-2">
          <label
            htmlFor="recipient"
            className="text-sm font-medium text-gray-700"
          >
            받는 사람
          </label>
          <input
            type="text"
            name="recipient"
            id="recipient"
            className="h-10 w-full rounded-md border border-gray-200 px-4 shadow-sm hover:border-grayBlue-200 focus:border-grayBlue-300 focus:outline-none sm:text-sm"
          />
        </div>
        <div className="flex w-full max-w-[800px] flex-col gap-2">
          <label
            htmlFor="content"
            className="flex gap-1.5 text-sm font-medium text-gray-700"
          >
            <span>메일 내용</span>
            <span className="font-normal text-gray-500">
              (한글로 간략히 입력하세요)
            </span>
          </label>
          <textarea
            name="content"
            id="content"
            className="h-full w-full grow resize-none rounded-xl border border-gray-200 p-6 outline-none transition-all duration-75 hover:border-grayBlue-200 focus:border-grayBlue-300"
          />
        </div>
      </form>
    </div>
  )
}

export default NewMailFlow
