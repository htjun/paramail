import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).end()

  const supabaseServerClient = createServerSupabaseClient({
    req,
    res,
  })

  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser()

  if (!user)
    return res.status(401).json({
      error: 'not_authenticated',
      description:
        'The user does not have an active session or is not authenticated',
    })

  const { data, error } = await supabaseServerClient.rpc('consume_credit', {
    user_id: user.id,
  })

  if (error) {
    console.error('Supabase error: ', error)
  }

  return res.json(data)
}
