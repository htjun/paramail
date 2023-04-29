import { useState } from 'react'
import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { inter, notoSansKR } from '@/lib/fonts'
import '@/styles/globals.css'

const App = ({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session
}>) => {
  const [supabase] = useState(() =>
    createBrowserSupabaseClient({
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    })
  )

  return (
    <>
      {/* eslint-disable */}
      <style jsx global>{`
        :root {
          --notoSansKr-font: ${notoSansKR.style.fontFamily};
          --inter-font: ${inter.style.fontFamily};
        }
      `}</style>
      <SessionContextProvider
        supabaseClient={supabase}
        initialSession={pageProps.initialSession}
      >
        <Component {...pageProps} />
      </SessionContextProvider>
      <Analytics />
    </>
  )
}

export default App
