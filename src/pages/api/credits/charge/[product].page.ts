import type { NextApiRequest, NextApiResponse } from 'next'
import stripe from '@/lib/stripe'
import axios from 'axios'
import isDevEnv from '@/utils/isDevEnv'

const { API_ROUTE_SECRET, SITE_URL } = process.env

const CREDIT100 = isDevEnv
  ? process.env.STRIPE_PRODUCT_CREDIT100_TEST
  : process.env.STRIPE_PRODUCT_CREDIT100

const CREDIT500 = isDevEnv
  ? process.env.STRIPE_PRODUCT_CREDIT500_TEST
  : process.env.STRIPE_PRODUCT_CREDIT500

const createStripeCustomer = async (
  supabaseProfileId: string,
  email: string
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
  const { product } = req.query

  const priceId: string =
    product === 'credit100'
      ? CREDIT100!
      : product === 'credit500'
      ? CREDIT500!
      : ''

  const {
    supabaseProfileId,
    email,
    stripeCustomerId: stripeCustomerIdFromSupabase,
    creditAmount,
  } = req.body

  let stripeCustomerId = stripeCustomerIdFromSupabase

  if (!email) {
    return res.status(401).send('Unauthorized')
  }

  if (!stripeCustomerId) {
    const stripeCustomerCreateRes = await createStripeCustomer(
      supabaseProfileId,
      email
    )
    stripeCustomerId = stripeCustomerCreateRes.id
  }

  const lineItems = [
    {
      price: priceId,
      quantity: 1,
    },
  ]

  const session = await stripe.checkout.sessions.create({
    metadata: {
      credit_amount: creditAmount,
    },
    customer: stripeCustomerId,
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: lineItems,
    success_url: `${SITE_URL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${SITE_URL}/app/settings/credits`,
  })

  res.send({
    id: session.id,
  })
}
