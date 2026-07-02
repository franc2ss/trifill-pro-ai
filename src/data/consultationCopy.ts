export const consultationCopy = {
  ko: {
    areas: { forehead: "이마", eyes: "눈가", cheeks: "볼과 광대", jawline: "턱선", fullface: "얼굴 전체" },
    priorities: { natural: "자연스러운 인상", recovery: "빠른 일상 복귀", lasting: "지속적인 만족도", comfort: "편안한 상담 경험", value: "비용 효율" },
    focus: { forehead: "표정선과 피부결", eyes: "눈가 잔주름과 탄력", cheeks: "모공과 피부결", jawline: "윤곽 탄력과 지지감", fullface: "얼굴 전반의 균형" },
    summary: (insight: string, area: string, focus: string, priority: string) => `${insight} 선택하신 ${area}에서는 ${focus}을 중심으로 살펴보고, ${priority}을 우선하는 상담 방향이 적합합니다.`,
    reason: (program: string, profile: string, area: string, focus: string, priority: string) => `${profile} 상담 기준에서 ${area}의 ${focus}과 ${priority}이라는 우선순위가 함께 확인되어 ${program}을 추천 상담 프로그램으로 구성했습니다.`,
    statuses: ["집중 상담 권장", "맞춤 상담 적합", "균형 상담 적합"],
    skinTypes: { normal: "중성", dry: "건성", oily: "지성", combination: "복합성", sensitive: "민감성", balanced: "균형" },
  },
  en: {
    areas: { forehead: "forehead", eyes: "eye area", cheeks: "cheeks", jawline: "jawline", fullface: "full face" },
    priorities: { natural: "natural-looking balance", recovery: "fast recovery", lasting: "long-lasting satisfaction", comfort: "comfort", value: "cost effectiveness" },
    focus: { forehead: "expression lines and texture", eyes: "fine lines and elasticity", cheeks: "pores and texture", jawline: "contour firmness and support", fullface: "overall facial balance" },
    summary: (insight: string, area: string, focus: string, priority: string) => `${insight} For the ${area}, the consultation emphasizes ${focus} while respecting your priority of ${priority}.`,
    reason: (program: string, profile: string, area: string, focus: string, priority: string) => `${program} was selected because the ${profile} profile, your focus on the ${area}, and your preference for ${priority} create a clear consultation need around ${focus}.`,
    statuses: ["Focused Consultation", "Personalized Consultation", "Balanced Consultation"],
    skinTypes: { normal: "Normal", dry: "Dry", oily: "Oily", combination: "Combination", sensitive: "Sensitive", balanced: "Balanced" },
  },
} as const;
