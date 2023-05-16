import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { twMerge } from 'tailwind-merge'
import isDevEnv from '@/utils/isDevEnv'
import { inter } from '@/lib/fonts'
import { buttonClasses } from '@/styles/sharedClasses'
import { CheckIcon } from '@heroicons/react/20/solid'
import { plansData } from './plansData'

const nextPublicStripeKey = isDevEnv
  ? process.env.NEXT_PUBLIC_STRIPE_KEY_TEST
  : process.env.NEXT_PUBLIC_STRIPE_KEY

const processSubscription =
  (
    planId: string,
    supabaseProfileId: string,
    email: string,
    stripeCustomerId: string
  ) =>
  async () => {
    const { data } = await axios.post(`/api/subscription/${planId}`, {
      supabaseProfileId,
      email,
      stripeCustomerId,
    })
    const stripe = await loadStripe(nextPublicStripeKey!)
    await stripe?.redirectToCheckout({ sessionId: data.id })
  }

const SubscribeButton = ({
  planId,
  planName,
  user,
}: {
  planId: string
  planName: string
  user: any
}) => {
  const {
    plan: currentPlan,
    id: supabaseProfileId,
    email,
    stripe_customer: stripeCustomerId,
  } = user

  if (planName === currentPlan) {
    return (
      <button className={buttonClasses('primary', 'md')} disabled>
        현재 사용중인 플랜
      </button>
    )
  }

  if (planName === 'free') return null

  return (
    <button
      onClick={processSubscription(
        planId,
        supabaseProfileId,
        email,
        stripeCustomerId
      )}
      className={buttonClasses('primary', 'md')}
    >
      {currentPlan !== 'business' ? '업그레이드' : '플랜 변경'}
    </button>
  )
}

export interface PlanProps {
  id: string
  name: {
    original: string
    label: string
    color: string
  }
  price: number
  currency: string
  user: any
}

const PlanCard = (plan: PlanProps) => {
  const { id, name, price, currency, user } = plan

  const [matchedPlan] = plansData.filter(item => item.key === name.original)
  const { features } = matchedPlan

  return (
    <div className="flex w-full max-w-[340px] flex-col rounded-2xl border border-gray-150 bg-white shadow-lg">
      <h2
        className={twMerge(
          'border-b border-gray-150 p-6 text-2xl font-medium tracking-tight',
          name.color
        )}
      >
        {name.label}
      </h2>
      <div className="flex flex-grow flex-col justify-between gap-8 px-6 py-8">
        <div className="flex items-baseline gap-1 border-b pb-6 font-medium text-gray-700">
          <span
            className={twMerge(inter.className, 'text-3xl tracking-tighter')}
          >
            {price.toLocaleString('ko-KR')}
          </span>
          <span>{currency}</span>
        </div>
        <div className="flex flex-grow flex-col justify-between gap-8">
          <ul className="flex flex-col gap-4">
            {features.map(feature => (
              <li
                key={feature}
                className="flex items-center gap-2 tracking-tight text-gray-700"
              >
                <CheckIcon className="h-4 w-4 text-indigo-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <SubscribeButton planId={id} planName={name.original} user={user} />
        </div>
      </div>
    </div>
  )
}

export const FreePlanCard = ({ user }: any) => {
  const freePlanData = plansData.filter(item => item.key === 'free')[0]
  return (
    <PlanCard
      id="free"
      name={{ ...freePlanData.name, original: 'free' }}
      price={freePlanData.price}
      currency={freePlanData.currency}
      user={user}
    />
  )
}

export default PlanCard
