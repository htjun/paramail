import { createClient } from '@supabase/supabase-js'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabaseServerClient = createServerSupabaseClient({
    req,
    res,
  })

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  const { data, error } = await supabaseServerClient.from('usage').insert([
    {
      usage_type: 'test-type',
      token_usage: 0,
      user_id: 'test',
    },
  ])

  if (error) {
    console.error(error)
    return res.status(500).json({ error: 'Failed to insert usage data' })
  }

  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser()

  // const { data } = await supabaseServerClient.from('usage').select()

  return res.json({ user, data })
}
