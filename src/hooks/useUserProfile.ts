import { useState, useEffect } from 'react'
import { useUser } from '@supabase/auth-helpers-react'
import { supabase } from '@/lib/supabaseClient'

export interface UserProfileProps {
  id: string
  full_name: string
  avatar_url: string
  usage: number
  email: string
  created_at: string
  stripe_customer: string
  plan: string
  usage_left: number
  credit: number
}

const useUserProfile = () => {
  const [profile, setProfile] = useState<null | any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const user = useUser()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true)
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user?.id)
          .single()

        if (error) {
          throw error
        }

        setProfile(data)
      } catch (error) {
        const err = error as Error
        console.error(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchProfile()
    }
  }, [user])

  return { profile, isLoading }
}

export default useUserProfile
