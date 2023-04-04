import Head from 'next/head'
import TextBox from '@/components/TextBox'
import ParamailLogo from 'public/paramail.svg'
import { Inter, Noto_Sans_KR } from 'next/font/google'
import { twMerge } from 'tailwind-merge'

const inter = Inter({ subsets: ['latin'] })
const notoSansKR = Noto_Sans_KR({ weight: ['400', '500'], preload: false })

export default function Home() {
  const handleButtonClick = () => {}
  return (
    <>
      <Head>
        <title>Paramail - AI 영어 메일 작성기</title>
        <meta
          name="description"
          content="GPT 기반의 영어 메일 번역, 분석 및 작성 도구"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={twMerge(
          notoSansKR.className,
          inter.className,
          'flex flex-col justify-center px-12 py-6'
        )}
      >
        <div className="flex h-9 items-center">
          <ParamailLogo />
        </div>
        <div className="my-12 flex flex-col gap-1.5">
          <h1 className="text-lg font-medium tracking-tighter">
            메일 번역 & 분석
          </h1>
          <p className="text-sm opacity-50">
            받은 메일을 한국어로 번역하고, 요점과 요구사항을 정리한 뒤, 답변
            내용 선택지를 생성합니다.
          </p>
        </div>
        <TextBox
          placeholder="받은 메일을 이곳에 붙여넣기 하세요."
          button={{
            label: '번역 & 분석',
            onClick: handleButtonClick,
          }}
        />
      </main>
    </>
  )
}
