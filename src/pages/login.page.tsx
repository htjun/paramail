import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession, signIn } from 'next-auth/react'
import { twMerge } from 'tailwind-merge'
import Navigation from '@/components/Navigation'
import { sectionContainer } from '@/styles/sharedClasses'

const LoginItem = ({ label }) => {
  const handleClick = () => {
    console.log('clicked')
  }
  return (
    <button type="button" onSubmit={handleClick}>
      {label}
    </button>
  )
}

const LoginPage = () => {
  const { status, data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.push('/app')
    }
  }, [status, session, router])

  return (
    <>
      <Navigation />
      <main className="flex w-full flex-col items-center justify-center px-4 py-12">
        <div
          className={twMerge(
            sectionContainer,
            'flex w-full max-w-lg flex-col gap-6 p-6'
          )}
        >
          <h2>원하시는 로그인 방식을 선택하세요</h2>
          <div>
            <button type="button" onClick={() => signIn('google')}>
              구글
            </button>
          </div>
        </div>
      </main>
    </>
  )
}

export default LoginPage
