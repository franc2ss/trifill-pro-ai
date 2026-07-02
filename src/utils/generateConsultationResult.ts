import { consultationCopy } from "@/data/consultationCopy";
import { consultationProfiles, concernProfileMap, type MetricKey, type ProfileId } from "@/data/consultationProfiles";
import { consultationPrograms, selectProgram } from "@/data/consultationPrograms";
import type { ConsultationResult, Language, QuestionnaireAnswers } from "@/types";
import { applyScoreModifiers, areaModifiers, interactionModifier, priorityModifiers } from "./scoreModifiers";

const profiles: ProfileId[] = ["wrinkleLift", "elasticRestore", "poreRefinement", "brightTone", "hydrationRestore", "acneBalance"];
const metrics: MetricKey[] = ["elasticity", "pores", "wrinkles", "texture", "skinTone"];

function skinType(lang: Language, concern: string, area: string, priority: string): string {
  const type = consultationCopy[lang].skinTypes;
  if (priority === "comfort" || (concern === "acne" && area === "eyes")) return type.sensitive;
  if (concern === "dryness") return area === "fullface" ? type.dry : type.sensitive;
  if (concern === "acne" || concern === "pores") return area === "fullface" ? type.combination : type.oily;
  if (concern === "tone" && priority === "natural") return type.balanced;
  if (area === "fullface") return type.combination;
  return concern === "wrinkles" ? type.normal : type.balanced;
}

export function generateConsultationResult(lang: Language, answers: QuestionnaireAnswers): ConsultationResult {
  const concern = answers.q1 ?? "elasticity";
  const area = answers.q2 ?? "fullface";
  const priority = answers.q3 ?? "natural";
  const profileId = concernProfileMap[concern] ?? "elasticRestore";
  const profile = consultationProfiles[profileId];
  const profileIndex = profiles.indexOf(profileId);
  const score = applyScoreModifiers(profile.scores, areaModifiers[area] ?? {}, priorityModifiers[priority] ?? {}, interactionModifier(profileIndex, area, priority));
  const programId = selectProgram(profileId, area, priority);
  const program = consultationPrograms[programId][lang];
  const resource = consultationCopy[lang];
  const areaLabel = resource.areas[area as keyof typeof resource.areas];
  const priorityLabel = resource.priorities[priority as keyof typeof resource.priorities];
  const focus = resource.focus[area as keyof typeof resource.focus];
  const profileCopy = profile.copy[lang];
  const secondary = profiles.map((id) => selectProgram(id, area, priority)).filter((id, index, all) => id !== programId && all.indexOf(id) === index).slice(0, 3);

  return {
    overallScore: score.overall,
    status: resource.statuses[(profileIndex + ["forehead", "eyes", "cheeks", "jawline", "fullface"].indexOf(area)) % 3],
    skinType: skinType(lang, concern, area, priority),
    mainConcern: profileCopy.concern,
    metrics: metrics.map((id) => ({ id, score: score[id], maxScore: 100 })),
    aiSummary: resource.summary(profileCopy.insight, areaLabel, focus, priorityLabel),
    consultationProgram: program.name,
    recommendationReason: resource.reason(program.name, profileCopy.name, areaLabel, focus, priorityLabel),
    recommendations: [{ title: program.name, stars: 5 }, ...secondary.map((id, index) => ({ title: consultationPrograms[id][lang].name, stars: index === 2 ? 3 : 4 }))],
  };
}
