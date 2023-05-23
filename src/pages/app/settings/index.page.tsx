import { useState, useEffect, ChangeEvent } from 'react'
import axios, { type AxiosError } from 'axios'
import Meta from '@/components/Meta'
import TextInput from '@/components/TextInput'
import { Button } from '@/components/Button'
import ErrorMessage from '@/components/ErrorMessage'
import useUserProfile from '@/hooks/useUserProfile'
import SettingsLayout from './Layout'

const SettingsPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const { profile, isLoading } = useUserProfile()
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<null | string>(null)

  useEffect(() => {
    if (profile) {
      setName(profile.full_name)
      setEmail(profile.email)
    }
  }, [profile, isLoading])

  useEffect(() => {
    if (name !== profile?.full_name) {
      setIsUpdateAvailable(true)
    } else {
      setIsUpdateAvailable(false)
    }
  }, [name, profile])

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleUpdateClick = async () => {
    setIsSubmitting(true)
    try {
      await axios.post('/api/update-profile', {
        newFullName: name,
      })
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError = error
        setErrorMessage(axiosError.message)
      }
    } finally {
      window.location.reload()
    }
  }

  return (
    <>
      <Meta title="내 정보 설정" />
      <SettingsLayout>
        <div className="flex flex-col gap-8 px-6 py-8">
          <h2 className="text-2xl">내 정보</h2>
          <TextInput
            id="name"
            value={name}
            onChange={handleNameChange}
            label="이름"
            className="w-full max-w-xs"
          />
          <TextInput
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            label="이메일"
            className="w-full max-w-xs"
            disabled
          />
        </div>
        <div className="flex w-full items-center justify-end gap-5 border-t px-6 py-4">
          {errorMessage && <ErrorMessage text={errorMessage} />}
          <Button
            intent="secondary"
            onClick={handleUpdateClick}
            loading={isSubmitting}
            disabled={!isUpdateAvailable}
          >
            업데이트
          </Button>
        </div>
      </SettingsLayout>
    </>
  )
}

export default SettingsPage
