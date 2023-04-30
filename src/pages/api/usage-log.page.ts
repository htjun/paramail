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

  const { usageType, usageAmount } = req.body

  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser()

  const { data, error } = await supabaseServerClient.from('usage').insert([
    {
      usage_type: usageType,
      token_usage: usageAmount,
      user_id: user?.id ?? null,
    },
  ])

  if (error) {
    console.error('Supabase error: ', error)
  }

  return res.json(data)
}
