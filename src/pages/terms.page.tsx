import { twMerge } from 'tailwind-merge'
import Meta from '@/components/Meta'
import { LandingPageNavigation } from '@/components/Navigation'
import { notoSansKR } from '@/lib/fonts'
import { sectionContainer } from '@/styles/sharedClasses'
import styles from '@/styles/article.module.css'

/* eslint-disable react/no-unescaped-entities */
const TermsAndConditionsPage = () => {
  return (
    <main className={twMerge(styles.article, notoSansKR.className)}>
      <h1>서비스 이용약관</h1>

      <h2>제1조 (목적)</h2>

      <p>
        본 이용약관은 회사가 제공하는 Paramail 서비스(이하 "서비스")의 이용과
        관련하여 회사와 이용자 간의 권리, 의무, 책임 사항 및 기타 필요한 사항을
        규정함을 목적으로 합니다.
      </p>

      <h2>제2조 (용어의 정의)</h2>
      <ol>
        <li>"회사"란 Paramail 서비스를 제공하는 주체를 말합니다.</li>
        <li>"이용자"란 회사가 제공하는 서비스를 이용하는 자를 말합니다.</li>
        <li>
          "계정"이란 이용자의 서비스 이용을 위하여 이용자가 가입 시 설정한
          이메일 주소 및 인증 정보를 말합니다.
        </li>
      </ol>
      <h2>제3조 (이용약관의 효력 및 변경)</h2>
      <ol>
        <li>
          본 약관은 서비스를 이용하려는 모든 이용자에게 적용되며, 이용자가
          약관의 내용에 동의함으로써 효력이 발생합니다.
        </li>
        <li>
          회사는 이용자의 이익을 손상시키지 않는 범위 내에서 약관을 변경할 수
          있으며, 변경된 약관은 서비스 화면에 게시하며, 게시일로부터 효력이
          발생합니다.
        </li>
      </ol>
      <h2>제4조 (서비스의 이용)</h2>
      <ol>
        <li>
          회사가 제공하는 서비스는 이메일 분석 및 작성을 도와주는 인공지능 기반
          서비스입니다.
        </li>
        <li>
          이용자는 회사가 정한 이용 요금을 지불함으로써 서비스를 이용할 수
          있습니다.
        </li>
        <li>
          이용자는 본 서비스를 이용함에 있어서 제3자의 권리를 침해하지 않아야
          하며, 이를 위반하여 발생하는 모든 책임은 이용자 본인에게 있습니다.
        </li>
      </ol>
      <h2>제5조 (서비스의 저작권)</h2>
      <ol>
        <li>서비스에 대한 저작권 및 지적재산권은 회사에게 있습니다.</li>
        <li>
          회사가 제공하는 서비스의 디자인, 텍스트, 스크립트, 그래픽 등 서비스에
          관련된 모든 자료 및 정보에 대한 저작권 기타 지적재산권은 회사에게
          있습니다.
        </li>
      </ol>
      <h2>제6조 (이용자 생성 콘텐츠의 저장)</h2>

      <p>회사는 이용자가 생성한 콘텐츠를 저장하지 않습니다.</p>

      <h2>제7조 (데이터 수집 및 이용)</h2>
      <ol>
        <li>
          이용자는 서비스 이용과 관련한 문의사항이 있는 경우 다음의 이메일
          주소를 통해 연락할 수 있습니다: admin@paramail.app 사용합니다.
        </li>
        <li>회사는 이용자가 제출한 콘텐츠를 수집하지 않습니다.</li>
      </ol>

      <h2>제8조 (계정의 관리 및 종료)</h2>
      <ol>
        <li>
          이용자는 본인의 계정을 관리할 책임이 있으며, 이용자의 계정 정보가
          부정확하거나 오래된 경우, 이용자는 회사에 정정을 요청할 수 있습니다.
        </li>
        <li>
          회사는 이용자의 계정이 부정한 방법으로 사용되거나, 이용약관에 위반되는
          행위가 발견될 경우 해당 계정을 중지하거나 종료할 수 있습니다.
        </li>
        <li>
          회사는 이용자의 비정상적인 과다 사용이 발견될 경우, 해당 계정을 중단
          또는 종료할 수 있습니다.
        </li>
      </ol>
      <h2>제9조 (청약철회 및 환불)</h2>
      <ol>
        <li>
          서비스 이용 시 발생하는 비용에 대해 청약철회 및 환불이 불가능합니다.
        </li>
        <li>
          회사는 이용자의 서비스 이용 중단을 원할 경우, 이용자는 서비스 이용료의
          환불을 요청할 수 없습니다.
        </li>
      </ol>
      <h2>제10조 (면책)</h2>
      <ol>
        <li>
          회사는 천재지변, 전쟁, 기타 불가항력적 사유로 인한 서비스 중단에
          대하여 책임을 지지 않습니다.
        </li>
        <li>
          회사는 이용자의 과실이나 제3자의 고의적인 행위로 인한 서비스 이용의
          장애에 대하여 책임을 지지 않습니다.
        </li>
        <li>
          회사는 이용자가 서비스를 이용하여 기대하는 수익을 상실한 것에 대하여
          책임을 지지 않으며, 서비스로부터 얻은 정보에 대한 신뢰도 및 정확성
          등에 대해서도 책임을 지지 않습니다.
        </li>
      </ol>
      <h2>제11조 (분쟁의 해결)</h2>
      <ol>
        <li>본 약관에 의한 분쟁은 대한민국 법률을 준거법으로 합니다.</li>
        <li>
          회사와 이용자 간에 발생한 분쟁은 원칙적으로 상호 협의를 통해 해결하며,
          협의가 이루어지지 않을 경우 해당 분쟁은 대한민국의 법원에 제소됩니다.
        </li>
      </ol>
      <h2>제12조 (고지 및 연락처)</h2>
      <ol>
        <li>
          회사는 이용자에게 고지할 사항이 있는 경우 이메일 등의 방법으로 고지할
          수 있습니다.
        </li>
        <li>
          이용자는 서비스 이용과 관련한 문의사항이 있는 경우 다음의 이메일
          주소를 통해 연락할 수 있습니다: admin@paramail.app
        </li>
      </ol>
    </main>
  )
}

const PrivacyPolicyPage = () => {
  return (
    <>
      <Meta title="Privacy Policy" />
      <main>
        <LandingPageNavigation />
        <div className="flex w-full flex-col items-center justify-center px-4 py-12">
          <div
            className={twMerge(
              sectionContainer,
              'flex w-full max-w-[900px] flex-col gap-6 px-6 py-8'
            )}
          >
            <TermsAndConditionsPage />
          </div>
        </div>
      </main>
    </>
  )
}

export default PrivacyPolicyPage
