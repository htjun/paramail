import { useState } from 'react'
import Header from '@/components/Header'
import { TabsRoot, TabsTrigger, TabsContent } from '@/components/Tabs'
import Meta from './components/Meta'
import ReplyFlow from './components/ReplyFlow'

const Home = () => {
  const [inProgress, setInProgress] = useState(false)

  return (
    <>
      <Meta />
      <div className="flex justify-center">
        <main className="w-full max-w-screen-xl px-12 pb-16 pt-6">
          <TabsRoot
            defaultValue="reply"
            className="flex flex-col justify-center gap-12"
          >
            <Header
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
            <TabsContent value="reply">
              <ReplyFlow setInProgress={setInProgress} />
            </TabsContent>
          </TabsRoot>
        </main>
      </div>
    </>
  )
}

export default Home
