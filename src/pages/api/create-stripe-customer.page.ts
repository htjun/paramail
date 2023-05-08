import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { getServiceSupabase } from '@/lib/supabaseClient'
import isDevEnv from '@/utils/isDevEnv'

const stripeSecretKey = isDevEnv
  ? process.env.STRIPE_SECRET_KEY_TEST
  : process.env.STRIPE_SECRET_KEY

const stripe = new Stripe(stripeSecretKey!, {
  apiVersion: '2022-11-15',
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET) {
    return res.status(401).send('Unauthorized')
  }

  const supabaseServerClient = getServiceSupabase()

  const {
    record: { email, id: supabaseProfileId },
  } = req.body

  try {
    const customer = await stripe.customers.create({ email })

    await supabaseServerClient
      .from('profiles')
      .update({
        stripe_customer: customer.id,
      })
      .eq('id', supabaseProfileId)

    res.send({ message: `Stripe customer created: ${customer.id}` })
  } catch (error) {
    const err = error as Error
    res.status(500).send({ error: err.message })
  }
}

export default handler
