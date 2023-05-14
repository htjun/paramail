import type { NextApiRequest, NextApiResponse } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import Stripe from 'stripe'
import axios from 'axios'
import isDevEnv from '@/utils/isDevEnv'

const stripeSecretKey = isDevEnv
  ? process.env.STRIPE_SECRET_KEY_TEST
  : process.env.STRIPE_SECRET_KEY

const { API_ROUTE_SECRET, SITE_URL } = process.env

const stripe = new Stripe(stripeSecretKey!, {
  apiVersion: '2022-11-15',
})

const createStripeCustomer = async (
  email: string,
  supabaseProfileId: string
) => {
  const { data } = await axios.post(
    `${SITE_URL}/api/create-stripe-customer?API_ROUTE_SECRET=${API_ROUTE_SECRET}`,
    {
      record: {
        email,
        id: supabaseProfileId,
      },
    }
  )

  return data
}

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
    .from('profiles')
    .select('stripe_customer')
    .eq('id', user.id)
    .single()

  if (!stripe_customer) {
    const stripeCustomerCreateRes = await createStripeCustomer(
      user.email ?? '',
      user.id
    )
    console.log('stripeCustomerCreateRes', stripeCustomerCreateRes)
  }

  const { planId } = req.query

  const lineItems = [
    {
      price: String(planId),
      quantity: 1,
    },
  ]

  const session = await stripe.checkout.sessions.create({
    customer: stripe_customer,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: lineItems,
    success_url: `${SITE_URL}/payment/success`,
    cancel_url: `${SITE_URL}/payment/cancelled`,
  })

  res.send({
    id: session.id,
  })
}
