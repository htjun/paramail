import Stripe from 'stripe'
import isDevEnv from '@/utils/isDevEnv'

const stripeSecretKey = isDevEnv
  ? process.env.STRIPE_SECRET_KEY_TEST
  : process.env.STRIPE_SECRET_KEY

const stripe = new Stripe(stripeSecretKey!, {
  apiVersion: '2022-11-15',
})

export default stripe
