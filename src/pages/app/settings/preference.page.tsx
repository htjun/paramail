import Meta from '@/components/Meta'
import SettingsLayout from './Layout'

const SettingsPage = () => {
  return (
    <>
      <Meta title="앱 설정" />
      <SettingsLayout>
        <div className="flex flex-col gap-8 px-6 py-8">
          <h2 className="text-2xl">앱 설정</h2>
        </div>
      </SettingsLayout>
    </>
  )
}

export default SettingsPage
