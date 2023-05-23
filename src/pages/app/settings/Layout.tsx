import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { AppNavigation } from '@/components/Navigation'
import { notoSansKR } from '@/lib/fonts'
import { sectionContainer } from '@/styles/sharedClasses'
import SettingsMenus from './Menus'

const SettingsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className={notoSansKR.className}>
      <AppNavigation />
      <div className="flex w-full flex-col items-center justify-center px-4 py-12">
        <div
          className={twMerge(
            sectionContainer,
            'flex min-h-[400px] w-full max-w-4xl'
          )}
        >
          <SettingsMenus />
          <section className="flex w-full flex-col justify-between">
            {children}
          </section>
        </div>
      </div>
    </main>
  )
}

export default SettingsLayout
