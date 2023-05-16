import type { NextApiRequest, NextApiResponse } from 'next'
import stripe from '@/lib/stripe'
import axios from 'axios'

const { API_ROUTE_SECRET, SITE_URL } = process.env

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
  const { planId } = req.query
  const {
    supabaseProfileId,
    email,
    stripeCustomerId: stripeCustomerIdFromSupabase,
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
      price: String(planId),
      quantity: 1,
    },
  ]

  const session = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: lineItems,
    success_url: `${SITE_URL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${SITE_URL}/app/upgrade`,
  })

  res.send({
    id: session.id,
  })
}
