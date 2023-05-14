import { NextApiRequest, NextApiResponse } from 'next'
import stripe from '@/lib/stripe'
import { buffer } from 'micro'
import { getServiceSupabase } from '@/lib/supabaseClient'

export const config = { api: { bodyParser: false } }

const getPlanName = (productId: string) => {
  switch (productId) {
    case 'price_1N6BhhBHqL6fXF9D5LzZfXfd':
      return 'pro'
    case 'price_1N6BiOBHqL6fXF9DRgHuq32R':
      return 'business'
    default:
      console.log('Unhandled product id')
      break
  }
}

const getUsageLeft = (productId: string) => {
  switch (productId) {
    case 'price_1N6BhhBHqL6fXF9D5LzZfXfd':
      return 100
    case 'price_1N6BiOBHqL6fXF9DRgHuq32R':
      return 3000
    default:
      console.log('Unhandled product id')
      break
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const signature = req.headers['stripe-signature']
  const signingSecret = process.env.STRIPE_SIGNING_SECRET
  const reqBuffer = await buffer(req)

  let event

  try {
    if (!signature) throw new Error('Signature is undefined')
    if (!signingSecret) throw new Error('Signing secret is undefined')
    event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret)
  } catch (error) {
    const err = error as Error
    return res.status(400).send(`Webhook error: ${err.message}`)
  }

  const supabase = getServiceSupabase()

  const { type: eventType, data: eventData } = event
  const { status, items, customer } = eventData.object as any
  const { plan } = items.data[0]
  const { product: productId } = plan

  switch (eventType) {
    case 'customer.subscription.updated':
      if (status === 'active') {
        await supabase
          .from('profiles')
          .update({
            plan: getPlanName(productId),
            usage_left: getUsageLeft(productId),
          })
          .eq('stripe_customer', customer)
      }
      break
    case 'customer.subscription.deleted':
      await supabase
        .from('profiles')
        .update({
          plan: 'free',
          usage_left: null,
        })
        .eq('stripe_customer', customer)
      break
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  console.log({ event })

  res.send({ received: true })
}

export default handler
