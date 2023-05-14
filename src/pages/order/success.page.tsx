import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { type GetServerSideProps } from 'next'
import Link from 'next/link'
import stripe from '@/lib/stripe'
import { twMerge } from 'tailwind-merge'
import {
  CheckBadgeIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/solid'
import Meta from '@/components/Meta'
import { AppNavigation } from '@/components/Navigation'
import {
  sectionContainer,
  buttonClasses,
  textLink,
} from '@/styles/sharedClasses'

interface PaymentSuccessPageProps {
  customer: string
  invoiceUrl: string
}

const PaymentSuccessPage = ({
  customer,
  invoiceUrl,
}: PaymentSuccessPageProps) => {
  const router = useRouter()

  useEffect(() => {
    if (!customer) {
      router.replace('/app')
    }
  }, [customer])

  return (
    <>
      <Meta title="결제 완료" />
      <main>
        <AppNavigation />
        <div className="flex w-full flex-col items-center justify-center px-4 py-12">
          <div
            className={twMerge(
              sectionContainer,
              'flex w-full max-w-lg flex-col gap-14 px-6 py-8'
            )}
          >
            <div className="flex flex-col gap-2">
              <h1 className="flex items-center gap-1.5 text-xl font-medium tracking-tight text-emerald-600">
                <CheckBadgeIcon className="h-6 w-6 text-emerald-500" />
                <span>결제가 완료되었습니다.</span>
              </h1>
              {!!invoiceUrl && (
                <a
                  href={invoiceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={twMerge(
                    textLink,
                    'mt-4 flex items-center gap-2 self-start text-sm'
                  )}
                >
                  <span>인보이스(Invoice) 확인</span>
                  <ArrowTopRightOnSquareIcon className="h-4 w-4 text-gray-450" />
                </a>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href="/app"
                className={twMerge(buttonClasses('primary', 'md'), 'text-base')}
              >
                앱으로 돌아가기
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let customer
  let invoiceUrl
  try {
    const sessionId = query.session_id
    const session = await stripe.checkout.sessions.retrieve(sessionId as string)
    customer = await stripe.customers.retrieve(session.customer as string)

    const invoice = await stripe.invoices.retrieve(session.invoice as string)
    invoiceUrl = invoice.hosted_invoice_url
  } catch (error) {
    customer = null
    invoiceUrl = null
  }

  return {
    props: {
      customer,
      invoiceUrl,
    },
  }
}

export default PaymentSuccessPage
