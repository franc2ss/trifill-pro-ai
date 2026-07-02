import type { Language } from "@/types";

export type MetricKey = "elasticity" | "wrinkles" | "pores" | "texture" | "skinTone";
export type ScoreSet = Record<"overall" | MetricKey, number>;
export type ProfileId = "wrinkleLift" | "elasticRestore" | "poreRefinement" | "brightTone" | "hydrationRestore" | "acneBalance";
type Copy = { name: string; skinType: string; concern: string; insight: string };
export type ConsultationProfile = { id: ProfileId; scores: ScoreSet; copy: Record<Language, Copy> };

export const concernProfileMap: Record<string, ProfileId> = { wrinkles: "wrinkleLift", elasticity: "elasticRestore", pores: "poreRefinement", tone: "brightTone", dryness: "hydrationRestore", acne: "acneBalance" };

export const consultationProfiles: Record<ProfileId, ConsultationProfile> = {
  wrinkleLift: { id: "wrinkleLift", scores: { overall: 84, elasticity: 89, wrinkles: 93, pores: 66, texture: 76, skinTone: 74 }, copy: {
    ko: { name: "주름 리프트", skinType: "중성", concern: "주름 및 잔주름", insight: "표정 움직임이 반복되는 부위의 선명도와 피부 지지력을 함께 살펴볼 필요가 있습니다." },
    en: { name: "Wrinkle Lift", skinType: "Normal", concern: "Wrinkles & Fine Lines", insight: "Line definition in expressive areas and the skin's visible support pattern should be considered together." } } },
  elasticRestore: { id: "elasticRestore", scores: { overall: 86, elasticity: 94, wrinkles: 83, pores: 70, texture: 80, skinTone: 77 }, copy: {
    ko: { name: "탄력 리스토어", skinType: "복합성", concern: "탄력 저하", insight: "윤곽을 따라 느껴지는 탄력 변화와 피부결의 균형을 중심으로 상담하는 것이 적합합니다." },
    en: { name: "Elastic Restore", skinType: "Combination", concern: "Loss of Elasticity", insight: "Visible firmness along the facial contours and texture balance should guide the consultation." } } },
  poreRefinement: { id: "poreRefinement", scores: { overall: 82, elasticity: 73, wrinkles: 67, pores: 92, texture: 88, skinTone: 75 }, copy: {
    ko: { name: "모공 리파인먼트", skinType: "지성", concern: "넓어진 모공", insight: "피지 활동이 두드러지는 부위의 모공 인상과 고르지 않은 피부결을 함께 검토해야 합니다." },
    en: { name: "Pore Refinement", skinType: "Oily", concern: "Enlarged Pores", insight: "Visible pore appearance and uneven texture in oil-prone areas should be reviewed together." } } },
  brightTone: { id: "brightTone", scores: { overall: 85, elasticity: 76, wrinkles: 69, pores: 68, texture: 83, skinTone: 94 }, copy: {
    ko: { name: "브라이트 톤", skinType: "균형", concern: "색소 및 톤 불균형", insight: "얼굴 전반의 톤 균일도와 국소적으로 눈에 띄는 색조 차이를 구분해 상담할 필요가 있습니다." },
    en: { name: "Bright Tone", skinType: "Balanced", concern: "Uneven Tone & Pigmentation", insight: "Overall tone uniformity and localized visible color contrast should be considered separately." } } },
  hydrationRestore: { id: "hydrationRestore", scores: { overall: 80, elasticity: 74, wrinkles: 71, pores: 69, texture: 91, skinTone: 88 }, copy: {
    ko: { name: "수분 리스토어", skinType: "건성", concern: "건조 및 수분 부족", insight: "수분 부족으로 거칠어 보이는 피부결과 잔주름 인상을 동시에 고려한 상담이 필요합니다." },
    en: { name: "Hydration Restore", skinType: "Dry", concern: "Dryness & Dehydration", insight: "Rough-looking texture and fine-line visibility associated with low hydration should be considered together." } } },
  acneBalance: { id: "acneBalance", scores: { overall: 79, elasticity: 72, wrinkles: 65, pores: 89, texture: 90, skinTone: 78 }, copy: {
    ko: { name: "트러블 밸런스", skinType: "민감성", concern: "여드름 및 트러블", insight: "민감하게 반응하는 부위와 모공·피부결의 불균형을 자극 부담 없이 살펴보는 상담이 중요합니다." },
    en: { name: "Acne Balance", skinType: "Sensitive", concern: "Acne & Blemishes", insight: "Reactive areas and visible pore-texture imbalance should be reviewed with sensitivity and comfort in mind." } } },
};
