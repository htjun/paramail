import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Stripe from 'stripe'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { twMerge } from 'tailwind-merge'
import Meta from '@/components/Meta'
import { AppNavigation } from '@/components/Navigation'
import { notoSansKR } from '@/lib/fonts'
import {
  marketingPageTitle,
  marketingPageSubtitle,
} from '@/styles/sharedClasses'
import WandSVG from 'public/wand.svg'
import PlanCard, { type PlanProps, FreePlanCard } from './PlanCard'

const UpgradePage = ({ plans }: { plans: PlanProps[] }) => {
  const router = useRouter()
  const { isLoading, session } = useSessionContext()

  useEffect(() => {
    if (!isLoading && !session) {
      router.replace('/')
    }
  }, [session])

  if (!isLoading && !!session)
    return (
      <>
        <Meta title="업그레이드" />
        <AppNavigation />
        <main className={notoSansKR.className}>
          Plans:{JSON.stringify(plans)}
          <div className="align-center mb-16 mt-20 flex flex-col items-center gap-10">
            <div className="inline-flex h-10 rounded-full bg-magic p-[1px]">
              <div className="inline-flex h-full shrink-0 items-center gap-2 rounded-full bg-white px-4 text-[#F07E78]">
                <WandSVG className="h-4 w-4" />
                <span className="bg-magic bg-clip-text text-sm font-medium [-webkit-text-fill-color:transparent]">
                  업그레이드
                </span>
              </div>
            </div>
            <h1 className={twMerge(marketingPageTitle, 'max-w-lg')}>
              <div>더 많은 기능을</div>
              <div>더 여유롭게 사용하세요</div>
            </h1>
            <p className={marketingPageSubtitle}>
              언제든지 구독을 중단하실 수 있습니다.
            </p>
          </div>
          <div className="mb-32 flex justify-center gap-8 px-6">
            <FreePlanCard />
            {plans.map(plan => (
              <PlanCard {...plan} />
            ))}
          </div>
        </main>
      </>
    )

  return null
}

export const getStaticProps = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-11-15',
  })

  const { data: prices }: { data: { [x: string]: any }[] } =
    await stripe.prices.list()

  const plans = await Promise.all(
    prices.map(async price => {
      const product = await stripe.products.retrieve(price.product)

      let productName = ''
      let productColor = ''
      switch (product.name) {
        case 'Pro':
          productName = '프로'
          productColor = 'text-indigo-500'
          break
        case 'Business':
          productName = '비즈니스'
          productColor = 'text-slate-500'
          break
        case 'Free':
          productName = '무료'
          productColor = 'text-navy-500'
          break
        default:
          break
      }

      let currencyLabel = ''
      switch (price.currency) {
        case 'usd':
          currencyLabel = '달러'
          break
        case 'krw':
          currencyLabel = '원'
          break
        default:
          currencyLabel = '원'
      }

      return {
        id: price.id,
        name: {
          original: product.name,
          label: productName,
          color: productColor,
        },
        price: price.unit_amount,
        currency: currencyLabel,
      }
    })
  )

  const sortedPlans = plans.sort((a, b) => a.price - b.price)

  return {
    props: {
      plans: sortedPlans,
    },
  }
}

export default UpgradePage
