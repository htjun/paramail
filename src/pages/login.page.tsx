import Navigation from '@/components/Navigation'
import { twMerge } from 'tailwind-merge'
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
            <LoginItem label="구글" />
          </div>
        </div>
      </main>
    </>
  )
}

export default LoginPage
