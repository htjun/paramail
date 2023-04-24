import { Inter, Noto_Sans_KR } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const notoSansKR = Noto_Sans_KR({ weight: ['400', '500'], preload: false })

export { inter, notoSansKR }
