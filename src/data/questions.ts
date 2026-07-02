import type { Question } from "@/types";

export const questions: Question[] = [
  {
    id: "q1",
    options: [
      { id: "wrinkles", icon: "lines" },
      { id: "acne", icon: "sparkles" },
      { id: "dryness", icon: "droplets" },
      { id: "tone", icon: "palette" },
      { id: "pores", icon: "circle-dot" },
      { id: "elasticity", icon: "heart" },
    ],
  },
  {
    id: "q2",
    options: [
      { id: "forehead", icon: "scan-face" },
      { id: "eyes", icon: "eye" },
      { id: "cheeks", icon: "smile" },
      { id: "jawline", icon: "jawline" },
      { id: "fullface", icon: "user" },
    ],
  },
  {
    id: "q3",
    options: [
      { id: "natural", icon: "leaf" },
      { id: "recovery", icon: "clock" },
      { id: "lasting", icon: "shield" },
      { id: "comfort", icon: "heart-handshake" },
      { id: "value", icon: "badge-check" },
    ],
  },
];
