import type { ScoreSet } from "@/data/consultationProfiles";
export type ScoreDelta = Partial<ScoreSet>;

export const areaModifiers: Record<string, ScoreDelta> = {
  forehead: { wrinkles: 3, texture: 2, overall: 1 }, eyes: { wrinkles: 4, elasticity: 2, texture: 1 },
  cheeks: { texture: 4, pores: 3, skinTone: 1 }, jawline: { elasticity: 5, texture: 2, overall: 1 },
  fullface: { overall: 2, elasticity: 1, wrinkles: 1, pores: 1, texture: 1, skinTone: 1 },
};
export const priorityModifiers: Record<string, ScoreDelta> = {
  natural: { overall: 1, texture: 2, skinTone: 2 }, recovery: { texture: 3, skinTone: 2, elasticity: -1 },
  lasting: { elasticity: 4, wrinkles: 3, overall: 2 }, comfort: { texture: 2, overall: 1 }, value: { overall: -1 },
};

const keys: (keyof ScoreSet)[] = ["overall", "elasticity", "wrinkles", "pores", "texture", "skinTone"];
const areas = ["forehead", "eyes", "cheeks", "jawline", "fullface"];
const priorities = ["natural", "recovery", "lasting", "comfort", "value"];

export function interactionModifier(profileIndex: number, area: string, priority: string): ScoreDelta {
  const signature = profileIndex * 25 + Math.max(0, areas.indexOf(area)) * 5 + Math.max(0, priorities.indexOf(priority));
  return { [keys[(signature + 1) % keys.length]]: signature % 2 ? -1 : 1, [keys[(signature + 3) % keys.length]]: signature % 3 ? 0 : 1 };
}

export function applyScoreModifiers(base: ScoreSet, ...modifiers: ScoreDelta[]): ScoreSet {
  const result = { ...base };
  for (const modifier of modifiers) for (const key of keys) result[key] += modifier[key] ?? 0;
  result.overall = clamp(result.overall, 68, 94);
  for (const key of keys.slice(1)) result[key] = clamp(result[key], 55, 95);
  return result;
}
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
