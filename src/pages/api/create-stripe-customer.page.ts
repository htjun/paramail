import { NextApiRequest, NextApiResponse } from 'next'
import stripe from '@/lib/stripe'
import { getServiceSupabase } from '@/lib/supabaseClient'

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
