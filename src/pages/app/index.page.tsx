import { useState, useEffect } from 'react'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { AppNavigation } from '@/components/Navigation'
import { TabsRoot, TabsTrigger, TabsContent } from '@/components/Tabs'
import Meta from '@/components/Meta'
import PageHeader from '@/components/PageHeader'
import ReplyFlow from './components/ReplyFlow'
import NewMailFlow from './components/NewMailFlow'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session)
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }

  return {
    props: {
      initialSession: session,
    },
  }
}

const AppPage = () => {
  const router = useRouter()
  const [inProgress, setInProgress] = useState(false)
  const [activeTab, setActiveTab] = useState('reply')

  useEffect(() => {
    switch (router.query?.type) {
      case 'reply':
        setActiveTab('reply')
        break
      case 'new':
        setActiveTab('new')
        break
      default:
        setActiveTab('reply')
        break
    }
  }, [router])

  return (
    <>
      <Meta title="이메일 생성하기" />
      <TabsRoot
        defaultValue="reply"
        value={activeTab}
        onValueChange={value => router.replace(`/app?type=${value}`)}
      >
        <AppNavigation
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
        <TabsContent value="reply" className="w-full">
          <PageHeader
            title="Reply email"
            description="받은 메일을 번역하고 분석한 뒤, 답장 메일을 생성합니다."
          />
        </TabsContent>
        <TabsContent value="new" className="w-full">
          <PageHeader
            title="New email"
            description="입력된 내용을 토대로 새로운 이메일을 생성합니다."
          />
        </TabsContent>
        <div className="flex flex-col items-center">
          <main className="w-full max-w-screen-xl px-0 py-8 md:px-12 md:py-12">
            <TabsContent value="reply">
              <ReplyFlow setInProgress={setInProgress} />
            </TabsContent>
            <TabsContent value="new">
              <NewMailFlow setInProgress={setInProgress} />
            </TabsContent>
          </main>
        </div>
      </TabsRoot>
    </>
  )
}

export default AppPage
