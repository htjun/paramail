import { twMerge } from 'tailwind-merge'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import Meta from '@/components/Meta'
import { LandingPageNavigation } from '@/components/Navigation'
import { sectionContainer, buttonClasses } from '@/styles/sharedClasses'

const LoginItem = ({ method, label }) => {
  const handleClick = e => {
    e.preventDefault()
  }
  return (
    <button
      type="button"
      onClick={handleClick}
      className={twMerge(buttonClasses('secondary', 'md'), 'w-full')}
    >
      {label}
    </button>
  )
}

const LoginPage = () => {
  return (
    <>
      <Meta title="로그인" />
      <main>
        <LandingPageNavigation page="login" />
        <div className="flex w-full flex-col items-center justify-center px-4 py-12">
          <div
            className={twMerge(
              sectionContainer,
              'flex w-full max-w-lg flex-col gap-6 px-6 py-8'
            )}
          >
            <h2 className="flex items-center gap-2 text-gray-600">
              <UserCircleIcon className="h-6 w-6 text-gray-400" />
              <span>원하시는 로그인 방식을 선택하세요</span>
            </h2>
            <div className="flex flex-col gap-3">
              <LoginItem method="google" label="구글" />
              <LoginItem method="facebook" label="페이스북" />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default LoginPage
