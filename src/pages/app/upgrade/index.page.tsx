import { twMerge } from 'tailwind-merge'
import Meta from '@/components/Meta'
import { AppNavigation } from '@/components/Navigation'
import { inter, notoSansKR } from '@/lib/fonts'
import {
  marketingPageTitle,
  marketingPageSubtitle,
  buttonClasses,
} from '@/styles/sharedClasses'
import { CheckIcon } from '@heroicons/react/20/solid'
import WandSVG from 'public/wand.svg'
import { plansData, type PlanProps } from './plansData'

const PlanCard = (plan: PlanProps) => {
  const { name, price, currency, features } = plan
  return (
    <div className="flex w-full max-w-[340px] flex-col rounded-2xl border border-gray-150 shadow-lg">
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
            {price}
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
          <a href="/" className={buttonClasses('primary', 'md')}>
            업그레이드
          </a>
        </div>
      </div>
    </div>
  )
}

const UpgradePage = () => {
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
          <h1 className={twMerge(marketingPageTitle, 'max-w-[400px]')}>
            더 많은 기능을 더 여유롭게 사용하세요
          </h1>
          <p className={marketingPageSubtitle}>
            언제든지 구독을 중단하실 수 있습니다.
          </p>
        </div>
        <div className="mb-32 flex justify-center gap-8 px-6">
          {plansData.map(plan => (
            <PlanCard key={plan.id} {...plan} />
          ))}
        </div>
      </main>
    </>
  )
}

export default UpgradePage
