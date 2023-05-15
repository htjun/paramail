import { useEffect } from 'react'
import { useRouter } from 'next/router'
import stripe from '@/lib/stripe'
import { twMerge } from 'tailwind-merge'
import Meta from '@/components/Meta'
import { AppNavigation } from '@/components/Navigation'
import { notoSansKR } from '@/lib/fonts'
import {
  marketingPageTitle,
  marketingPageSubtitle,
} from '@/styles/sharedClasses'
import WandSVG from 'public/wand.svg'
import useUserProfile from '@/hooks/useUserProfile'
import PlanCard, { type PlanProps, FreePlanCard } from './PlanCard'
import { formatProductName, formatCurrency } from './plansData'

const UpgradePage = ({ plans }: { plans: PlanProps[] }) => {
  const router = useRouter()

  const { profile, isLoading } = useUserProfile()

  useEffect(() => {
    if (!isLoading && !profile) {
      router.replace('/')
    }
  }, [profile])

  if (!isLoading && !!profile)
    return (
      <>
        <Meta title="업그레이드" />
        <AppNavigation />
        <main className={notoSansKR.className}>
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
          <div className="mb-32 flex flex-col items-center justify-center gap-8 px-6 md:flex-row md:items-stretch">
            <FreePlanCard user={{ plan: 'business' }} />
            {plans.map(plan => (
              <PlanCard key={plan.id} {...plan} user={{ plan: 'business' }} />
            ))}
          </div>
        </main>
      </>
    )

  return null
}

export const getStaticProps = async () => {
  const { data: prices }: { data: { [x: string]: any }[] } =
    await stripe.prices.list()

  const plans = await Promise.all(
    prices.map(async price => {
      const product = await stripe.products.retrieve(price.product)

      return {
        id: price.id,
        name: formatProductName(product.metadata.id),
        price: price.unit_amount,
        currency: formatCurrency(price.currency),
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
