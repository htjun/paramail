import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession, signIn } from 'next-auth/react'
import { twMerge } from 'tailwind-merge'
import Navigation from '@/components/Navigation'
import { sectionContainer, buttonSecondary } from '@/styles/sharedClasses'

const LoginItem = ({ method, label }) => {
  const handleClick = e => {
    e.preventDefault()
    signIn(method)
  }
  return (
    <button
      type="button"
      onClick={handleClick}
      className={twMerge(buttonSecondary, 'w-full text-base')}
    >
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
            'flex w-full max-w-lg flex-col gap-6 px-6 py-8'
          )}
        >
          <h2 className="text-gray-600">원하시는 로그인 방식을 선택하세요</h2>
          <div>
            <LoginItem method="google" label="구글" />
          </div>
        </div>
      </main>
    </>
  )
}

export default LoginPage
