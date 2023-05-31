import { useEffect, type ReactNode } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@/hooks/useUser'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter()
  const { user, isLoading } = useUser()

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/auth/login')
    }
  }, [user, isLoading])

  if (!isLoading && user) {
    return <div>{children}</div>
  }

  return null
}

export default ProtectedRoute
