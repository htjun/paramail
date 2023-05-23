import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import useUserProfile from './useUserProfile'

const useCredit = () => {
  const [credit, setCredit] = useState<number | null>(null)
  const { profile } = useUserProfile()
  const initialCredit = profile?.credit || null

  useEffect(() => {
    setCredit(initialCredit)

    const channel = supabase
      .channel('realtime credit')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${profile?.id}`,
        },
        payload => {
          setCredit(payload.new.credit)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, profile])

  return credit
}

export default useCredit
