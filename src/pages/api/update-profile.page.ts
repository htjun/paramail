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

  const { newFullName } = req.body

  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser()

  const { data, error } = await supabaseServerClient
    .from('profiles')
    .update({
      full_name: newFullName,
    })
    .eq('id', user?.id)

  if (error) {
    console.error('Supabase error: ', error)
  }

  return res.json(data)
}
