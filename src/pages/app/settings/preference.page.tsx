import Meta from '@/components/Meta'
import SettingsLayout from './Layout'

const SettingsPage = () => {
  return (
    <>
      <Meta title="앱 설정" />
      <SettingsLayout>
        <div className="flex flex-col gap-8 px-6 py-8">
          <h2 className="text-2xl">앱 설정</h2>
          <div className="text-gray-500">추후 추가될 예정입니다.</div>
        </div>
      </SettingsLayout>
    </>
  )
}

export default SettingsPage
