import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="description"
          content="AI 외국어 이메일 번역, 분석 및 작성 앱"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="break-keep bg-gray-25 text-gray-900 antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
