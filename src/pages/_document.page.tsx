import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="AI 외국어 이메일 번역/분석/작성 앱" />
        <meta
          name="keywords"
          content="영어 이메일,외국어 이메일,비즈니스 이메일,영어 이메일 작성,영어 이메일 교정"
        />
        <meta name="author" content="Paramail" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:title"
          content="Paramail - AI 외국어 이메일 번역/분석/작성 앱"
        />
        <meta
          property="og:description"
          content="GPT 언어 모델을 사용해 손쉽게 외국어 이메일을 번역, 분석, 작성할 수 있습니다."
        />
        <meta property="og:image" content="https://paramail.app/og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Paramail - AI 외국어 이메일 번역/분석/작성 앱"
        />
        <meta
          name="twitter:description"
          content="GPT 언어 모델을 사용해 손쉽게 외국어 이메일을 번역, 분석, 작성할 수 있습니다."
        />
        <meta name="twitter:image" content="https://paramail.app/og.png" />
        <link rel="canonical" href="https://paramail.app" />
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
