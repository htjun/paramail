import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { twMerge } from 'tailwind-merge'
import { GetServerSidePropsContext } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { CircleStackIcon } from '@heroicons/react/24/outline'
import Meta from '@/components/Meta'
import { Button } from '@/components/Button'
import { useUser } from '@/hooks/useUser'
import isDevEnv from '@/utils/isDevEnv'
import { inter } from '@/lib/fonts'
import SettingsLayout from './Layout'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session)
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }

  return { props: {} }
}

interface CreditButtonProps {
  creditAmount: string
  description: string
  price: string
  onClick: () => void
}

const CreditButton = ({
  creditAmount,
  description,
  price,
  onClick,
}: CreditButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    setIsLoading(true)
    onClick()
  }

  return (
    <Button
      className="flex h-24 justify-between gap-4 text-base"
      onClick={handleClick}
      loading={isLoading}
    >
      <div className="flex flex-col items-start gap-0.5">
        <div>
          <span
            className={twMerge(inter.className, 'font-semibold tracking-tight')}
          >
            {creditAmount}
          </span>
          <span> 크레딧</span>
        </div>
        <div className="text-sm font-normal text-gray-450">{description}</div>
      </div>
      <div className="flex items-baseline gap-0.5">
        <span
          className={twMerge(
            inter.className,
            'text-2xl font-medium tracking-tight'
          )}
        >
          {price}
        </span>
        <span>원</span>
      </div>
    </Button>
  )
}

const nextPublicStripeKey = isDevEnv
  ? process.env.NEXT_PUBLIC_STRIPE_KEY_TEST
  : process.env.NEXT_PUBLIC_STRIPE_KEY

const SettingsCreditPage = () => {
  const { userDetails, credit } = useUser()

  const {
    id: supabaseProfileId,
    email,
    stripe_customer: stripeCustomerId,
  } = userDetails || {}

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
    <>
      <Meta title="크레딧 충전" />
      <SettingsLayout>
        <div className="flex flex-col px-6 py-8">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row">
            <h2 className="text-2xl">크레딧 충전</h2>
            <div className="inline-flex items-center gap-2 self-start rounded-lg bg-gray-50 px-3 py-1.5">
              <div className="flex items-center gap-1">
                <CircleStackIcon className="h-5 w-5 text-gray-450" />
                <span className="mb-0.5">현재 크레딧:</span>
              </div>
              <span className={twMerge(inter.className, 'font-medium')}>
                {credit?.toLocaleString('ko-KR')}
              </span>
            </div>
          </div>
          <div className="mb-4 text-gray-600">
            아래 버튼을 눌러서 크레딧을 충전하세요.
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <CreditButton
              creditAmount="100"
              description="1 크레딧 = 49원"
              price="4,900"
              onClick={() =>
                processSubscription({
                  product: 'credit100',
                  creditAmount: 100,
                })
              }
            />
            <CreditButton
              creditAmount="500"
              description="1 크레딧 = 39.8원"
              price="19,900"
              onClick={() =>
                processSubscription({
                  product: 'credit500',
                  creditAmount: 500,
                })
              }
            />
          </div>
          <hr className="my-10" />
          <h2 className="mb-4 text-lg font-medium tracking-tight">
            크레딧 차감 기준
          </h2>

          <h3 className="min-w-[80px] py-2 font-medium">답변 메일</h3>
          <ul className="mb-4 list-inside list-disc pl-3">
            <li className="border-b border-gray-100 py-2">
              <span className="inline-block min-w-[120px]">번역 & 분석:</span>
              <span>1 크레딧</span>
            </li>
            <li className="border-b border-gray-100 py-2">
              <span className="inline-block min-w-[120px]">
                답변 메일 생성:
              </span>
              <span>1 크레딧</span>
            </li>
          </ul>

          <h3 className="min-w-[80px] py-2 font-medium">새 메일</h3>
          <ul className="list-inside list-disc pl-3 ">
            <li className="border-b border-gray-100 py-2">
              <span className="inline-block min-w-[120px]">새 메일 생성:</span>
              <span>1 크레딧</span>
            </li>
          </ul>
        </div>
      </SettingsLayout>
    </>
  )
}

export default SettingsCreditPage
