import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import isDevEnv from '@/utils/isDevEnv'
import useUserProfile from '@/hooks/useUserProfile'

const nextPublicStripeKey = isDevEnv
  ? process.env.NEXT_PUBLIC_STRIPE_KEY_TEST
  : process.env.NEXT_PUBLIC_STRIPE_KEY

const CreditsPage = () => {
  const { profile } = useUserProfile()

  const {
    id: supabaseProfileId,
    email,
    stripe_customer: stripeCustomerId,
  } = profile || {}

  const processSubscription = async ({
    product,
    creditAmount,
  }: {
    product: string
    creditAmount: number
  }) => {
    const { data } = await axios.post(`/api/credits/charge/${product}`, {
      supabaseProfileId,
      email,
      stripeCustomerId,
      creditAmount,
    })
    const stripe = await loadStripe(nextPublicStripeKey!)
    await stripe?.redirectToCheckout({ sessionId: data.id })
  }

  return (
    <main className="flex flex-col items-center justify-center">
      <h1>Credits</h1>
      <div>
        <div>
          <h2>Credit 100</h2>
          <button
            onClick={() =>
              processSubscription({
                product: 'credit100',
                creditAmount: 100,
              })
            }
          >
            buy
          </button>
        </div>
        <div>
          <h2>Credit 500</h2>
          <button
            onClick={() =>
              processSubscription({
                product: 'credit500',
                creditAmount: 500,
              })
            }
          >
            buy
          </button>
        </div>
      </div>
    </main>
  )
}

export default CreditsPage
