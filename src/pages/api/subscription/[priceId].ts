import type { NextApiRequest, NextApiResponse } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import Stripe from 'stripe'
import isDevEnv from '@/utils/isDevEnv'

const stripeSecretKey = isDevEnv
  ? process.env.STRIPE_SECRET_KEY_TEST
  : process.env.STRIPE_SECRET_KEY

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabaseServerClient = createServerSupabaseClient({
    req,
    res,
  })

  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser()

  if (!user) {
    return res.status(401).send('Unauthorized')
  }

  const {
    data: { stripe_customer },
  }: any = await supabaseServerClient
    .from('profile')
    .select('stripe_customer')
    .eq('id', user.id)
    .single()

  const stripe = new Stripe(stripeSecretKey!, {
    apiVersion: '2022-11-15',
  })

  const { priceId } = req.query

  const lineItems = [
    {
      price: String(priceId),
      quantity: 1,
    },
  ]

  const session = await stripe.checkout.sessions.create({
    customer: stripe_customer,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: lineItems,
    success_url: `${process.env.CLIENT_URL}/payment/success`,
    cancel_url: `${process.env.CLIENT_URL}/payment/cancelled`,
  })

  res.send({
    id: session.id,
  })
}
