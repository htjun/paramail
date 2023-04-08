import { useState } from 'react'
import Header from '@/components/Header'
import Meta from './components/Meta'
import ReplyFlow from './components/ReplyFlow'

const Home = () => {
  const [inProgress, setInProgress] = useState(false)

  return (
    <>
      <Meta />
      <div className="flex justify-center">
        <main className="flex w-full max-w-screen-xl flex-col justify-center gap-12 px-12 pb-16 pt-6">
          <Header isInProgress={inProgress} />
          <ReplyFlow setInProgress={setInProgress} />
        </main>
      </div>
    </>
  )
}

export default Home
