import { useState, useEffect, ChangeEvent } from 'react'
import { GetServerSidePropsContext } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import axios, { type AxiosError } from 'axios'
import Meta from '@/components/Meta'
import TextInput from '@/components/TextInput'
import { Button } from '@/components/Button'
import ErrorMessage from '@/components/ErrorMessage'
import { useUser } from '@/hooks/useUser'
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

const SettingsProfilePage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const { userDetails, isLoading } = useUser()
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<null | string>(null)

  useEffect(() => {
    if (userDetails) {
      setName(userDetails.full_name)
      setEmail(userDetails.email)
    }
  }, [userDetails, isLoading])

  useEffect(() => {
    if (name !== userDetails?.full_name) {
      setIsUpdateAvailable(true)
    } else {
      setIsUpdateAvailable(false)
    }
  }, [name, userDetails])

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

export default SettingsProfilePage
