import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'
import { Inter, Noto_Sans_KR } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })
const notoSansKR = Noto_Sans_KR({ weight: ['400', '500'], preload: false })

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <>
      {/* eslint-disable */}
      <style jsx global>{`
        :root {
          --notoSansKr-font: ${notoSansKR.style.fontFamily};
          --inter-font: ${inter.style.fontFamily};
        }
      `}</style>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
      <Analytics />
    </>
  )
}

export default App
