import { NextApiRequest, NextApiResponse } from 'next'
import stripe from '@/lib/stripe'
import { buffer } from 'micro'
import { getServiceSupabase } from '@/lib/supabaseClient'
import isDevEnv from '@/utils/isDevEnv'

export const config = { api: { bodyParser: false } }

const stripeSigningSecret = isDevEnv
  ? process.env.STRIPE_SIGNING_SECRET_TEST
  : process.env.STRIPE_SIGNING_SECRET

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const signature = req.headers['stripe-signature']
  const reqBuffer = await buffer(req)

  let event

  try {
    if (!signature) throw new Error('Signature is undefined')
    if (!stripeSigningSecret) throw new Error('Signing secret is undefined')
    event = stripe.webhooks.constructEvent(
      reqBuffer,
      signature,
      stripeSigningSecret
    )
  } catch (error) {
    const err = error as Error
    return res.status(400).send(`Webhook error: ${err.message}`)
  }

  const supabase = getServiceSupabase()

  const { type: eventType, data: eventData } = event
  const {
    status,
    metadata: { credit_amount },
    customer,
  } = eventData.object as any

  switch (eventType) {
    case 'checkout.session.completed':
      if (status === 'complete') {
        await supabase.rpc('charge_credit', {
          input_stripe_customer_id: customer,
          amount: credit_amount,
        })
      }
      break
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  res.send({ received: true })
}

export default handler
