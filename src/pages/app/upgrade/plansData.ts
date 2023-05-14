export const plansData = [
  {
    key: 'free',
    name: {
      label: '무료',
      color: 'text-slate-500',
    },
    price: 0,
    currency: '원',
    features: ['월 최대 5건 이메일 생성', '영어 이메일 사용 지원'],
  },
  {
    key: 'pro',
    name: {
      label: '프로',
      color: 'text-indigo-500',
    },
    price: 4900,
    currency: '원',
    features: [
      '월 최대 100건 이메일 생성',
      '5개 언어 이메일 사용 지원',
      '어조, 길이 등 세부 설정 기능',
      '생성된 이메일 교정 기능',
      '다크모드 지원',
    ],
  },
  {
    key: 'business',
    name: {
      label: '비즈니스',
      color: 'text-navy-500',
    },
    price: 24900,
    currency: '원',
    features: [
      '무제한 이메일 생성',
      '5개 언어 이메일 사용 지원',
      '어조, 길이 등 세부 설정 기능',
      '생성된 이메일 교정 기능',
      '다크모드 지원',
    ],
  },
]

export const formatProductName = (name: string) => {
  switch (name) {
    case 'pro':
      return {
        original: name,
        label: '프로',
        color: 'text-indigo-500',
      }
    case 'business':
      return {
        original: name,
        label: '비즈니스',
        color: 'text-navy-500',
      }
    case 'free':
      return {
        original: 'free',
        label: '무료',
        color: 'text-slate-500',
      }
    default:
      return {
        original: '',
        label: '',
        color: '',
      }
  }
}

export const formatCurrency = (currency: string) => {
  switch (currency) {
    case 'usd':
      return '달러'
    case 'krw':
      return '원'
    default:
      return '원'
  }
}
