import { ChatCompletionRequestMessage } from 'openai'

export const analysisPromptMessages = (
  userMessage: string
): ChatCompletionRequestMessage[] => {
  return [
    {
      role: 'system',
      content: `Summarize, list up to 5 actions with _^, provide up to 3 answers in <20 words, each with _^. All in Korean.`,
    },
    {
      role: 'user',
      content: `Tom, Saw your hike pics, let's plan one too. Office potluck April 14th, let me know your dish. Need website mockups by April 12th or update if more time needed.
      Mia`,
    },
    {
      role: 'assistant',
      content: `Summary: 미아가 톰에게 그룹 하이킹을 계획하자고 제안하며, 4월 14일 사무실 팟럭 참여 의사와 가져올 음식을 물어보고, 웹사이트 리디자인 프로젝트의 초기 목업을 4월 12일까지 제출해달라는 요청을 보내왔습니다.

      Action points:
      _^ 그룹 하이킹 계획에 대해 답장하세요.
      _^ 4월 14일 팟럭 참여 의사와 가져올 음식을 미아에게 알려주세요.
      _^ 웹사이트 리디자인 프로젝트의 초기 목업을 4월 12일까지 제출하세요.
            
      Possible answers:
      _^ 그룹 하이킹 재미있겠네요. 팟럭에는 샌드위치를 가져갈게요.
      _^ 그룹 하이킹은 어려울것 같아요. 팟럭에는 도넛을 가져갈게요.
      _^ 그룹 하이킹 좋습니다. 4월 14일은 일정이 있어서 팟럭에 참여하기 어려울것 같네요.`,
    },
    {
      role: 'user',
      content: `Samantha, Need your input on marketing (attached) and social media ideas. Contact Emily for launch event? Let's discuss over coffee next week.
      Alex`,
    },
    {
      role: 'assistant',
      content: `Summary: 알렉스가 마케팅 자료와 소셜 미디어 아이디어를 공유하고, 런칭 이벤트에 대해 이메일을 보내는 것을 제안하며, 다음 주에 커피챗을 하자고 합니다.

      Action points:
      _^ 첨부 된 마케팅 자료와 소셜 미디어 아이디어를 검토하고 제안해주세요.
      _^ 에밀리에게 연락해서 출시 행사를 논의하세요.
      _^ 커피챗 일정을 제안하세요.
            
      Possible answers:
      _^ 마케팅 자료와 소셜 미디어 아이디어는 확인했습니다. 에밀리와는 곧 연락해볼게요. 다음 주 화요일 커피챗 어떠세요?
      _^ 마케팅 자료와 소셜 미디어 아이디어 곧 확인하겠습니다. 에밀리와도 연락해볼게요. 커피챗은 다음 주 언제가 가능하신가요?`,
    },
    {
      role: 'user',
      content: `Hi Alex, your purchase has been processed. Thanks, Amazon`,
    },
    {
      role: 'assistant',
      content: `Summary: 아마존에서 알렉스에게 구매가 완료되었다는 내용을 알려줍니다.

      Action points:
      확인할 사항이 없습니다.
      
      Possible answers:
      답변이 필요하지 않습니다.`,
    },
    {
      role: 'user',
      content: userMessage,
    },
  ]
}

export const createReplyEmailPromptMessages = (
  userMessage: string
): ChatCompletionRequestMessage[] => {
  return [
    {
      role: 'system',
      content: `Write an answer email in English for the received email based on the answer summary provided.`,
    },
    {
      role: 'user',
      content: `Received email: Hi Jason!

      Thanks for reaching out.
      
      Are you using the iOS 16 and WatchOS 9.0?
      
      If so, it can be the same issue that recently our Developers have also recognized with the WatchOS app, especially with the new OS released by Apple.
      
      For the latest update we received from the Developers, the WatchOS 9.1 will be soon released and the issue will be fixed completely. So, we recommend that you can try to update the WatchOS 9.1.
      
      If the issue still happens, please let us know.
      
      Habitify Habitify from Habitify
      
      Answer summary: WatchOS 9.1로 업데이트하였지만, 문제가 여전히 발생합니다. 어떻게 해결할 수 있을까요?`,
    },
    {
      role: 'assistant',
      content: `Subject: Re: Issue with Habitify WatchOS App - WatchOS 9.1 Update

      Hello Habitify,
      
      Thank you for your prompt response. I have updated my Apple Watch to WatchOS 9.1 as you suggested, but unfortunately, the issue with the Habitify app still persists.
      
      Could you please advise on how I can resolve this issue? I really enjoy using the app and would like to continue using it on my Apple Watch.
      
      Looking forward to your assistance.
      
      Best regards,
      
      Jason`,
    },
    {
      role: 'user',
      content: `Received email: Hello Jason,

      Thank you for contacting us.
      
      In order for us to check our system to see if your card is still present, we will need the full credit card number. We will delete your information once this case is closed for your privacy reasons.
      
      Could you please reply to this email with your full credit card number?
      
      Thanks and we hope you have a great day,
      Paige
      
      The Wilson Parking Team
      
      Answer summary: 제 카드 정보를 이메일로 보내기는 위험합니다. 다른 방법으로 확인할 수 있을까요?`,
    },
    {
      role: 'assistant',
      content: `Subject: Re: Request for Full Credit Card Number

      Hello Paige,
      
      Thank you for your response. I appreciate your efforts to assist me with my concern. However, I am hesitant to send my full credit card number through email due to security reasons.
      
      Is there any other way for you to check your system and see if my card is still present without me sharing my full credit card number? Perhaps, there could be an alternative way to verify my identity or my account details?
      
      I appreciate your understanding and I look forward to hearing from you.
      
      Best regards,
      
      Jason`,
    },
    {
      role: 'user',
      content: `Received email: If could you please advice the date from the 01/08/22 onwards when someone will be available at the collection address between 09.00am – 05.00pm to hand the boxed machine to the courier.
      Thank you.
      
      Answer summary:  1월 10일, 1월 12일, 1월 14일에 수령 가능합니다.`,
    },
    {
      role: 'assistant',
      content: `Subject: Re: Requested Date for Courier Collection

      Dear [Name],
      
      Thank you for your email. We are pleased to inform you that we can arrange for someone to be available at the collection address to hand the boxed machine to the courier on the following dates:
      
      - January 10th
      - January 12th
      - January 14th
      
      All of these dates are available between 09.00 am – 05.00 pm.
      
      Please let us know which date works best for you and we will arrange accordingly.
      
      Thank you for choosing our services.
      
      Best regards,
      
      [Your Name]`,
    },
    {
      role: 'user',
      content: userMessage,
    },
  ]
}

export const createNewEmailPromptMessages = (
  userMessage: string
): ChatCompletionRequestMessage[] => {
  return [
    {
      role: 'system',
      content: `Write an email in English based on the provided data.`,
    },
    {
      role: 'user',
      content: userMessage,
    },
  ]
}
