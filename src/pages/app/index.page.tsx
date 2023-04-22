import { useState } from 'react'
import Navigation from '@/components/Navigation'
import { TabsRoot, TabsTrigger, TabsContent } from '@/components/Tabs'
import Meta from './components/Meta'
import ReplyFlow from './components/ReplyFlow'
import NewMailFlow from './components/NewMailFlow'

const Home = () => {
  const [inProgress, setInProgress] = useState(false)

  return (
    <>
      <Meta />
      <TabsRoot
        defaultValue="reply"
        className="flex w-full flex-col items-center justify-center gap-6"
      >
        <Navigation
          isInProgress={inProgress}
          tabsTrigger={
            <TabsTrigger
              items={[
                { value: 'reply', label: '답변 메일' },
                { value: 'new', label: '새 메일' },
              ]}
            />
          }
        />
        <main className="w-full max-w-screen-xl px-12 pb-16 pt-6">
          <TabsContent value="reply">
            <ReplyFlow setInProgress={setInProgress} />
          </TabsContent>
          <TabsContent value="new">
            <NewMailFlow />
          </TabsContent>
        </main>
      </TabsRoot>
    </>
  )
}

export default Home
