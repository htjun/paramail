import { ChatCompletionRequestMessage } from 'openai'

export const analysisPromptMessages = (
  userMessage: string
): ChatCompletionRequestMessage[] => {
  return [
    {
      role: 'system',
      content: `You are a smart assistant working for the recipient of this email who is Korean. Summarize this email and list up to 5 action points if needed. Prefix each with this exact symbol _^. Also come up with up to 3 possible answers to this email in Korean, straight to the point with no greeting, and in less than 20 words. Prefix each with _^.`,
    },
    {
      role: 'user',
      content: `Hey Tom, Hope you're doing well! I saw those pictures from your weekend hike on Instagram – looked like a ton of fun! We should plan a group hike sometime. On a different note, we're organizing an office potluck next Friday, April 14th. We thought it'd be a great opportunity to unwind and enjoy each other's company before the quarterly review. If you're in, just let me know what dish you'd like to bring, and I'll add it to the list! Also, I wanted to quickly check in on the progress of the website redesign project. Do you think you'll have the initial mockups ready for review by next Wednesday, April 12th? No worries if you need more time, just give me a heads up so I can adjust the schedule accordingly. Looking forward to the potluck and your update! Take care, Mia`,
    },
    {
      role: 'assistant',
      content: `Summary: 미아가 인스타그램에 올린 주말 하이킹 사진을 보았다고 하며, 그룹 하이킹을 계획해보자고 합니다. 또한, 4월 14일 금요일에 사무실 팟럭을 계획 중이며, 참석 여부와 가져올 음식을 알려 달라고 요청합니다. 마지막으로 웹사이트 리디자인 프로젝트 진행 상황에 대해 문의하였으며, 4월 12일 수요일까지 초기 목업을 검토할 수 있는지 물었습니다.

      Action points:
      _^ 그룹 하이킹 계획에 대해 답장하세요.
      _^ 팟럭 참여 의사와 가져올 음식을 미아에게 알려주세요.
      _^ 웹사이트 리디자인 프로젝트의 초기 목업 검토 가능 여부를 미아에게 알려주세요.
      
      Possible answers:
      _^ 물론이죠, 저는 행운을 빌어요. 샐러드를 가져올게요. 다음 주 수요일까지는 웹사이트 모형이 준비될 것입니다.
      _^ 다음 달에 단체 하이킹을 계획해요. 저는 포트럭을 위해 디저트를 가져올 것입니다. 모의고사는 다음 주 수요일까지 준비될 것입니다.
      _^ 초대해 주셔서 감사합니다만, 저는 포트럭에 갈 수 없을 것 같습니다. 모의고사는 다음 주 수요일까지 준비될 것입니다.`,
    },
    {
      role: 'user',
      content: `Subject: Launch Stuff & Coffee?

      Hey Samantha, How's it going? I heard you went to Hawaii recently - can't wait to hear all about it!
      So, we've got that product launch coming up, and I was hoping you could help with a couple of things. Can you take a look at the marketing stuff (attached) and let me know what you think? Also, we need some social media ideas - any suggestions? Oh, and we should talk about the launch event. Maybe reach out to Emily Thompson? Let's catch up over coffee next week to discuss everything and share Hawaii stories!
      
      Thanks a bunch!
      
      Alex`,
    },
    {
      role: 'assistant',
      content: `Summary: 알렉스가 새 제품 출시를 준비 중이며, 마케팅 자료와 소셜 미디어 아이디어를 공유해 달라는 요청과 함께 런칭 이벤트에 대해 이야기하고 싶다는 내용입니다.

      Action points:
      _^ 마케팅 자료를 검토하고 의견을 알려주세요.
      _^ 소셜 미디어 아이디어를 제안해주세요.
      _^ 이벤트에 대해 이야기하고 싶으니 다음 주 커피를 마시면서 만나서 이야기해봅시다.
      
      Possible answers:
      _^ 마케팅 자료와 소셜 미디어 아이디어를 검토하고 제안해드리겠습니다. 다음 주에 커피를 마시면서 만나서 이야기해봅시다.
      _^ 하와이 여행은 좋았습니다. 마케팅 자료와 소셜 미디어 아이디어를 검토하고 제안해드리겠습니다. 다음 주에 커피를 마시면서 만나서 이야기해봅시다.
      _^ 마케팅 자료와 소셜 미디어 아이디어를 검토하고 제안해드리겠습니다. 다음 주에는 시간이 없어서 만날 수 없습니다.`,
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

export const generatePromptMessages = (
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
