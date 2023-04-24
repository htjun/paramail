import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'
import { inter, notoSansKR } from '@/lib/fonts'
import { SessionProvider } from 'next-auth/react'
import '@/styles/globals.css'

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
