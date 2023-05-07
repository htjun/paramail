import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET) {
    return res.status(401).send('Unauthorized')
  }

  const supabaseServerClient = createServerSupabaseClient({
    req,
    res,
  })

  const {
    record: { email },
  } = req.body

  try {
    const customer = await stripe.customers.create({ email })

    const {
      data: { user },
    } = await supabaseServerClient.auth.getUser()

    await supabaseServerClient
      .from('profiles')
      .update({
        stripe_customer: customer.id,
      })
      .eq('id', user?.id)

    res.send({ message: `Stripe customer created: ${customer.id}` })
  } catch (error) {
    const err = error as Error
    res.status(500).send({ error: err.message })
  }
}

export default handler
