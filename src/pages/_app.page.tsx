import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'
import { inter, notoSansKR } from '@/lib/fonts'
import '@/styles/globals.css'

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

      <Analytics />
    </>
  )
}

export default App
