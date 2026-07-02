import type { Language } from "@/types";

export type TranslationKeys = {
  appName: string;
  welcome: { title: string; subtitle: string; feature1: string; feature2: string; feature3: string; start: string };
  questionnaire: { selectOne: string; q1: string; q2: string; q3: string; options: Record<string, string>; previous: string; next: string };
  photoUpload: { title: string; dragDrop: string; browse: string; camera: string; instructionTitle: string; instruction1: string; instruction2: string; instruction3: string; remove: string };
  loading: { title: string; steps: string[] };
  result: { title: string; overallScore: string; skinType: string; mainConcern: string; elasticity: string; pores: string; wrinkles: string; texture: string; skinTone: string; aiSummary: string; recommendedConsultation: string; downloadPdf: string; restart: string };
  common: { step: string };
};

const ko: TranslationKeys = {
  appName: "Trifill PRO AI",
  welcome: { title: "AI 피부 상담", subtitle: "간단한 3가지 질문과 얼굴 사진을 바탕으로\n개인 맞춤형 피부 분석을 확인해 보세요.", feature1: "3가지 질문", feature2: "AI 정밀 분석", feature3: "맞춤 리포트", start: "상담 시작하기" },
  questionnaire: {
    selectOne: "하나만 선택해 주세요.", q1: "가장 큰 피부 고민은 무엇인가요?", q2: "어떤 부위를 개선하고 싶으신가요?", q3: "가장 중요하게 생각하는 것은 무엇인가요?",
    options: { wrinkles: "주름 및 잔주름", acne: "여드름 및 트러블", dryness: "건조 및 수분 부족", tone: "색소 및 톤 불균형", pores: "모공", elasticity: "탄력 저하", forehead: "이마", eyes: "눈가", cheeks: "볼 및 광대", jawline: "턱선 및 턱", fullface: "얼굴 전체", natural: "자연스러운 결과", recovery: "빠른 회복", lasting: "오래가는 효과", comfort: "최소한의 불편함", value: "합리적인 비용" },
    previous: "이전", next: "다음",
  },
  photoUpload: { title: "정면 얼굴 사진을 업로드해 주세요", dragDrop: "드래그하여 놓기", browse: "파일 찾기", camera: "카메라 촬영", instructionTitle: "촬영 가이드", instruction1: "밝은 자연광에서 촬영해 주세요", instruction2: "화장 없이 정면을 바라봐 주세요", instruction3: "머리카락이 얼굴을 가리지 않게 해 주세요", remove: "사진 삭제" },
  loading: { title: "AI 피부 분석 중", steps: ["설문 분석", "얼굴 이미지 분석", "육안 피부 특징 감지", "AI 상담 생성"] },
  result: { title: "AI 피부 상담 결과", overallScore: "종합 피부 점수", skinType: "피부 타입", mainConcern: "주요 고민", elasticity: "탄력", pores: "모공", wrinkles: "주름", texture: "피부결", skinTone: "피부 톤", aiSummary: "AI 요약", recommendedConsultation: "추천 상담 항목", downloadPdf: "PDF 다운로드", restart: "상담 다시 시작" },
  common: { step: "단계" },
};

const en: TranslationKeys = {
  appName: "Trifill PRO AI",
  welcome: { title: "AI Skin Consultation", subtitle: "Complete 3 simple questions and upload your facial photo\nfor a personalized skin analysis.", feature1: "3 Questions", feature2: "AI Analysis", feature3: "Custom Report", start: "Start Consultation" },
  questionnaire: {
    selectOne: "Please select only one", q1: "What is your biggest skin concern?", q2: "Which area would you like to improve?", q3: "What matters most to you?",
    options: { wrinkles: "Wrinkles & Fine Lines", acne: "Acne & Blemishes", dryness: "Dryness & Dehydration", tone: "Uneven Tone & Spots", pores: "Enlarged Pores", elasticity: "Loss of Elasticity", forehead: "Forehead", eyes: "Eye Area", cheeks: "Cheeks", jawline: "Jawline & Chin", fullface: "Full Face", natural: "Natural-Looking Results", recovery: "Quick Recovery", lasting: "Long-Lasting Effects", comfort: "Minimal Discomfort", value: "Cost Effectiveness" },
    previous: "Previous", next: "Next",
  },
  photoUpload: { title: "Please upload a front-facing facial photo", dragDrop: "Drag & Drop", browse: "Browse File", camera: "Mobile Camera", instructionTitle: "Photo Guidelines", instruction1: "Take the photo in bright, natural lighting", instruction2: "Face forward without makeup", instruction3: "Keep hair away from your face", remove: "Remove photo" },
  loading: { title: "Analyzing Your Skin", steps: ["Questionnaire Analysis", "Facial Image Analysis", "Visible Skin Feature Detection", "AI Consultation Generation"] },
  result: { title: "AI Skin Consultation Results", overallScore: "Overall Skin Score", skinType: "Skin Type", mainConcern: "Main Concern", elasticity: "Elasticity", pores: "Pores", wrinkles: "Wrinkles", texture: "Texture", skinTone: "Skin Tone", aiSummary: "AI Summary", recommendedConsultation: "Recommended Consultation", downloadPdf: "Download PDF", restart: "Restart Consultation" },
  common: { step: "Step" },
};

export const translations: Record<Language, TranslationKeys> = { ko, en };
export function getQuestionText(lang: Language, questionId: "q1" | "q2" | "q3"): string { return translations[lang].questionnaire[questionId]; }
