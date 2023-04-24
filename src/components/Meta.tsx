import Head from 'next/head'

const Meta = ({ title }: { title?: string }) => {
  return (
    <Head>
      <title>
        {title
          ? `${title} - Paramail`
          : 'Paramail - 외국어 이메일 분석/작성 앱'}
      </title>
    </Head>
  )
}

export default Meta
