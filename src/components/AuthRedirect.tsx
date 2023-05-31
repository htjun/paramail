import { useEffect, type ReactNode } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@/hooks/useUser'

interface AuthRedirectProps {
  children: ReactNode
}

const AuthRedirect = ({ children }: AuthRedirectProps) => {
  const router = useRouter()
  const { user, isLoading } = useUser()

  useEffect(() => {
    if (!isLoading && user) {
      router.replace('/app')
    }
  }, [user, isLoading])

  if (!isLoading && !user) {
    return <div>{children}</div>
  }

  return null
}

export default AuthRedirect
