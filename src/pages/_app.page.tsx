import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter, Noto_Sans_KR } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const notoSansKR = Noto_Sans_KR({ weight: ['400', '500'], preload: false })

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      {/* eslint-disable */}
      <style jsx global>{`
        :root {
          --notoSansKr-font: ${notoSansKR.style.fontFamily};
          --inter-font: ${inter.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}

export default App
