import { MouseEvent } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { twMerge } from 'tailwind-merge'
import { buttonClasses } from '@/styles/sharedClasses'
import GoogleLogo from 'public/logo-google.svg'
import FacebookLogo from 'public/logo-facebook.svg'

interface OAuthButtonProps {
  method: 'google' | 'facebook'
  label: string
}

const OAuthButton = ({ method, label }: OAuthButtonProps) => {
  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    await supabase.auth.signInWithOAuth({
      provider: method,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/app`,
      },
    })
  }

  let logoImg = null

  switch (method) {
    case 'google':
      logoImg = <GoogleLogo className="h-4 w-4" />
      break
    case 'facebook':
      logoImg = <FacebookLogo className="h-4 w-4" />
      break
    default:
      break
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={twMerge(
        buttonClasses('secondary', 'md'),
        'relative w-full text-base'
      )}
    >
      <span className="absolute left-4">{logoImg}</span>
      <span>{label}</span>
    </button>
  )
}

export default OAuthButton
