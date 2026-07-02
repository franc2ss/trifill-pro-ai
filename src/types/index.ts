export type Language = "ko" | "en";

export type AppStep =
  | "welcome"
  | "questionnaire"
  | "photo-upload"
  | "loading"
  | "result";

export type QuestionnaireAnswers = {
  q1: string | null;
  q2: string | null;
  q3: string | null;
};

export type MetricScore = {
  id: string;
  score: number;
  maxScore: number;
};

export type ConsultationResult = {
  overallScore: number;
  status: string;
  skinType: string;
  mainConcern: string;
  metrics: MetricScore[];
  aiSummary: string;
  consultationProgram: string;
  recommendationReason: string;
  recommendations: {
    title: string;
    stars: number;
  }[];
};

export type QuestionOption = {
  id: string;
  icon: string;
};

export type Question = {
  id: keyof QuestionnaireAnswers;
  options: QuestionOption[];
};
