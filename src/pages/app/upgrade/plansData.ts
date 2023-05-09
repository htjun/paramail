export interface PlanProps {
  id: number
  name: {
    label: string
    color: string
  }
  price: string
  currency: string
  features: string[]
}

export const plansData: PlanProps[] = [
  {
    id: 0,
    name: {
      label: '무료',
      color: 'text-slate-500',
    },
    price: '0',
    currency: '원',
    features: ['월 최대 5건 이메일 생성', '영어 이메일 사용 지원'],
  },
  {
    id: 1,
    name: {
      label: '프로',
      color: 'text-indigo-500',
    },
    price: '4,900',
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
    id: 2,
    name: {
      label: '비즈니스',
      color: 'text-navy-500',
    },
    price: '24,900',
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
