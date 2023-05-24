import { useEffect, useState, createContext, useContext, useMemo } from 'react'
import {
  useUser as useSupaUser,
  useSessionContext,
  type User,
} from '@supabase/auth-helpers-react'

export type UserDetails = {
  id: string
  full_name: string
  avatar_url: string
  usage: number
  email: string
  created_at: string
  stripe_customer: string
  credit: number
}

type UserContextType = {
  accessToken: string | null
  user: User | null
  userDetails: UserDetails | null
  credit: number | null
  isLoading: boolean
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export interface Props {
  [propName: string]: any
}

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext()
  const user = useSupaUser()
  const accessToken = session?.access_token ?? null
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
  const [credit, setCredit] = useState<number | null>(null)

  const getUserDetails = () =>
    supabase.from('profiles').select('*').eq('id', user?.id).single()

  useEffect(() => {
    if (user && !isLoadingData && !userDetails) {
      setIsLoadingData(true)
      Promise.allSettled([getUserDetails()]).then(results => {
        const userDetailsPromise = results[0]

        if (userDetailsPromise.status === 'fulfilled') {
          const userDetailsPromiseData = userDetailsPromise.value
            .data as UserDetails
          setUserDetails(userDetailsPromiseData)
          setCredit(userDetailsPromiseData.credit)
        }

        const channel = supabase
          .channel('realtime credit')
          .on(
            'postgres_changes',
            {
              event: 'UPDATE',
              schema: 'public',
              table: 'profiles',
              filter: `id=eq.${user?.id}`,
            },
            payload => {
              setCredit(payload.new.credit)
            }
          )
          .subscribe()

        setIsLoadingData(false)

        return () => {
          supabase.removeChannel(channel)
        }
      })
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null)
    }
  }, [user, isLoadingUser])

  const value = useMemo(() => {
    return {
      accessToken,
      user,
      userDetails,
      credit,
      isLoading: isLoadingUser || isLoadingData,
    }
  }, [accessToken, user, userDetails, credit, isLoadingUser, isLoadingData])

  return <UserContext.Provider value={value} {...props} />
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`)
  }
  return context
}
