import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export function useAuth(redirectUrl = '/') {
  const { status, data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated' && !session) {
      router.push(redirectUrl)
    }
  }, [status, session, router, redirectUrl])
}
