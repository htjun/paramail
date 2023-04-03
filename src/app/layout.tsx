import { twMerge } from 'tailwind-merge'
import { Inter, Noto_Sans_KR } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const notoSansKR = Noto_Sans_KR({ weight: ['400', '500'], preload: false })

export const metadata = {
  title: 'Paramail - AI 영어 메일 작성기',
  description: 'GPT 기반의 영어 메일 번역, 분석 및 작성 도구 ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={twMerge(
          notoSansKR.className,
          'bg-gray-50',
          'text-gray-900',
          'antialiased'
        )}
      >
        {children}
      </body>
    </html>
  )
}
