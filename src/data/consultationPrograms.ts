import type { Language } from "@/types";
import type { ProfileId } from "./consultationProfiles";

export type ProgramId = "elasticLift" | "naturalVolume" | "brightTone" | "hydrationRecovery" | "poreRefinement" | "acneBalance" | "firming" | "skinRevitalization";
type Copy = { name: string; benefit: string };

export const consultationPrograms: Record<ProgramId, Record<Language, Copy>> = {
  elasticLift: { ko: { name: "엘라스틱 리프트 프로그램", benefit: "탄력과 주름 인상을 함께 고려한 집중 상담" }, en: { name: "Elastic Lift Program", benefit: "Focused consultation for firmness and visible lines" } },
  naturalVolume: { ko: { name: "내추럴 볼륨 프로그램", benefit: "자연스러운 윤곽 균형 상담" }, en: { name: "Natural Volume Program", benefit: "Consultation for natural-looking contour balance" } },
  brightTone: { ko: { name: "브라이트 톤 프로그램", benefit: "맑고 균일해 보이는 피부 톤 상담" }, en: { name: "Bright Tone Program", benefit: "Consultation for clearer, even-looking tone" } },
  hydrationRecovery: { ko: { name: "하이드레이션 리커버리 프로그램", benefit: "편안한 피부결과 수분 균형 상담" }, en: { name: "Hydration Recovery Program", benefit: "Consultation for texture and hydration balance" } },
  poreRefinement: { ko: { name: "포어 리파인먼트 프로그램", benefit: "모공과 피부결의 정돈된 인상 상담" }, en: { name: "Pore Refinement Program", benefit: "Consultation for refined pore and texture appearance" } },
  acneBalance: { ko: { name: "트러블 밸런스 프로그램", benefit: "민감도와 피부결 균형 상담" }, en: { name: "Acne Balance Program", benefit: "Consultation balancing sensitivity and texture" } },
  firming: { ko: { name: "퍼밍 프로그램", benefit: "얼굴선과 피부 지지감 중심 상담" }, en: { name: "Firming Program", benefit: "Consultation focused on contours and skin support" } },
  skinRevitalization: { ko: { name: "스킨 리바이탈라이제이션 프로그램", benefit: "피부 톤과 결을 검토하는 통합 상담" }, en: { name: "Skin Revitalization Program", benefit: "Integrated tone and texture consultation" } },
};

const choices: Record<ProfileId, ProgramId[]> = {
  wrinkleLift: ["elasticLift", "naturalVolume", "firming"], elasticRestore: ["firming", "elasticLift", "naturalVolume"],
  poreRefinement: ["poreRefinement", "skinRevitalization", "hydrationRecovery"], brightTone: ["brightTone", "skinRevitalization", "hydrationRecovery"],
  hydrationRestore: ["hydrationRecovery", "skinRevitalization", "naturalVolume"], acneBalance: ["acneBalance", "hydrationRecovery", "poreRefinement"],
};
const priorityOffset: Record<string, number> = { natural: 1, recovery: 2, lasting: 0, comfort: 2, value: 1 };

export function selectProgram(profile: ProfileId, area: string, priority: string): ProgramId {
  const areaOffset = area === "fullface" ? 1 : area === "cheeks" ? 2 : 0;
  return choices[profile][((priorityOffset[priority] ?? 0) + areaOffset) % 3];
}
