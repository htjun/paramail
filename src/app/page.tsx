import ParamailLogo from 'public/paramail.svg'

export default function Home() {
  return (
    <main className="flex flex-col justify-center px-12 py-6">
      <div className="flex h-9 items-center">
        <ParamailLogo />
      </div>
      <div className="my-12 flex flex-col gap-1.5">
        <h1 className="text-lg font-medium tracking-tighter">
          메일 번역 & 분석
        </h1>
        <p className="text-sm opacity-50">
          받은 메일을 한국어로 번역하고, 요점과 요구사항을 정리한 뒤, 답변 내용
          선택지를 생성합니다.
        </p>
      </div>
    </main>
  )
}
