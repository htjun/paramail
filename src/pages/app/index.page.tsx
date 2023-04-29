import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSessionContext } from '@supabase/auth-helpers-react'
import Navigation from '@/components/Navigation'
import { TabsRoot, TabsTrigger, TabsContent } from '@/components/Tabs'
import Meta from '@/components/Meta'
import ReplyFlow from './components/ReplyFlow'
import NewMailFlow from './components/NewMailFlow'

const AppPage = () => {
  const router = useRouter()
  const [inProgress, setInProgress] = useState(false)

  const { isLoading, session } = useSessionContext()

  useEffect(() => {
    if (!isLoading && !session) {
      router.replace('/')
    }
  }, [isLoading, session])

  if (session)
    return (
      <>
        <Meta title="이메일 생성하기" />
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
          <main className="w-full max-w-screen-xl px-4 pb-16 pt-3 md:px-12 md:pt-6">
            <TabsContent value="reply">
              <ReplyFlow setInProgress={setInProgress} />
            </TabsContent>
            <TabsContent value="new">
              <NewMailFlow setInProgress={setInProgress} />
            </TabsContent>
          </main>
        </TabsRoot>
      </>
    )

  return <>App page Loading...</>
}

export default AppPage
