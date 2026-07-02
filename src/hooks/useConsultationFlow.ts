"use client";

import { useCallback, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { generateConsultationResult } from "@/utils/generateConsultationResult";
import type {
  AppStep,
  ConsultationResult,
  Language,
  QuestionnaireAnswers,
} from "@/types";

const initialAnswers: QuestionnaireAnswers = {
  q1: null,
  q2: null,
  q3: null,
};

export function useConsultationFlow(language: Language) {
  const [step, setStep] = useState<AppStep>("welcome");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuestionnaireAnswers>(initialAnswers);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [result, setResult] = useState<ConsultationResult | null>(null);

  const startConsultation = useCallback(() => {
    setStep("questionnaire");
    setQuestionIndex(0);
  }, []);

  const selectAnswer = useCallback(
    (questionId: keyof QuestionnaireAnswers, optionId: string) => {
      setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    },
    []
  );

  const goNext = useCallback(() => {
    if (step === "questionnaire") {
      if (questionIndex < 2) {
        setQuestionIndex((prev) => prev + 1);
      } else {
        setStep("photo-upload");
      }
      return;
    }

    if (step === "photo-upload") {
      setStep("loading");
      return;
    }
  }, [step, questionIndex]);

  const goPrevious = useCallback(() => {
    if (step === "questionnaire" && questionIndex > 0) {
      setQuestionIndex((prev) => prev - 1);
      return;
    }

    if (step === "questionnaire" && questionIndex === 0) {
      setStep("welcome");
      return;
    }

    if (step === "photo-upload") {
      setStep("questionnaire");
      setQuestionIndex(2);
    }
  }, [step, questionIndex]);

  const setPhoto = useCallback((preview: string | null) => {
    setPhotoPreview(preview);
  }, []);

  const completeLoading = useCallback(() => {
    setResult(generateConsultationResult(language, answers));
    setStep("result");
  }, [language, answers]);

  const restart = useCallback(() => {
    setStep("welcome");
    setQuestionIndex(0);
    setAnswers(initialAnswers);
    setPhotoPreview(null);
    setResult(null);
  }, []);

  const sanitizeElementStyles = (cloneEl: HTMLElement, sourceEl: HTMLElement) => {
    const computed = window.getComputedStyle(sourceEl);
    const style = cloneEl.style;
    const badColorRegex = /oklab|oklch|lab|lch|color-mix|color\(/i;

    const sanitizeProperty = (prop: string, value: string) => {
      if (!value || !badColorRegex.test(value)) return;

      if (prop.includes("background")) {
        style.setProperty(prop, "transparent", "important");
        return;
      }

      if (prop.includes("border") || prop.includes("outline")) {
        style.setProperty(prop, "none", "important");
        return;
      }

      if (prop.includes("shadow")) {
        style.setProperty(prop, "none", "important");
        return;
      }

      if (prop.includes("color")) {
        style.setProperty(prop, "#ffffff", "important");
        return;
      }

      style.setProperty(prop, "initial", "important");
    };

    for (let i = 0; i < computed.length; i += 1) {
      const prop = computed.item(i);
      if (!prop) continue;
      const value = computed.getPropertyValue(prop);
      sanitizeProperty(prop, value);
    }

    if (computed.backgroundImage && badColorRegex.test(computed.backgroundImage)) {
      style.setProperty("background-image", "none", "important");
    }
  };

  const makeSafeClone = (root: HTMLElement) => {
    const clone = root.cloneNode(true) as HTMLElement;
    const wrapper = document.createElement("div");
    wrapper.style.position = "fixed";
    wrapper.style.left = "-9999px";
    wrapper.style.top = "0";
    wrapper.style.opacity = "0";
    wrapper.style.pointerEvents = "none";
    wrapper.style.zIndex = "-1";

    const safeStyle = document.createElement("style");
    safeStyle.textContent = `
      * {
        background-image: none !important;
        background: transparent !important;
        border: none !important;
        outline: none !important;
        box-shadow: none !important;
        text-shadow: none !important;
        filter: none !important;
        color: #f5f1e9 !important;
        fill: #f5f1e9 !important;
        stroke: #f5f1e9 !important;
      }
      *::before, *::after {
        content: none !important;
        display: none !important;
      }
    `;

    const cloneElements = [clone, ...Array.from(clone.querySelectorAll("*"))];
    cloneElements.forEach((cloneEl) => {
      if (cloneEl instanceof HTMLElement || cloneEl instanceof SVGElement) {
        const style = cloneEl.style;
        style.setProperty("background-image", "none", "important");
        style.setProperty("background", "transparent", "important");
        style.setProperty("border", "none", "important");
        style.setProperty("outline", "none", "important");
        style.setProperty("box-shadow", "none", "important");
        style.setProperty("text-shadow", "none", "important");
        style.setProperty("filter", "none", "important");
        style.setProperty("color", "#f5f1e9", "important");
        style.setProperty("fill", "#f5f1e9", "important");
        style.setProperty("stroke", "#f5f1e9", "important");
      }
    });

    wrapper.appendChild(safeStyle);
    wrapper.appendChild(clone);
    return wrapper;
  };

  const generatePdfFromElement = async (element: HTMLElement) => {
    const canvas = await html2canvas(element, {
      backgroundColor: "#080808",
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [canvas.width, canvas.height] });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`trifill-pro-result-${Date.now()}.pdf`);
  };

  const downloadPdf = useCallback(async () => {
    const resultSection = document.querySelector("[data-pdf-root]") as HTMLElement | null;
    if (!resultSection) {
      window.alert(
        language === "ko"
          ? "PDF 생성에 실패했습니다. 다시 시도해주세요."
          : "Failed to generate PDF. Please try again."
      );
      return;
    }

    try {
      await generatePdfFromElement(resultSection);
      return;
    } catch (error) {
      console.warn("html2canvas failed on result section, attempting sanitized clone:", error);
    }

    try {
      const safeClone = makeSafeClone(resultSection);
      const wrapper = document.createElement("div");
      wrapper.style.position = "fixed";
      wrapper.style.left = "-9999px";
      wrapper.style.top = "0";
      wrapper.style.opacity = "0";
      wrapper.style.pointerEvents = "none";
      wrapper.appendChild(safeClone);
      document.body.appendChild(wrapper);

      await generatePdfFromElement(safeClone);
    } catch (error) {
      console.error("PDF generation failed after sanitization:", error);
      window.alert(
        language === "ko"
          ? "PDF 생성에 실패했습니다. 브라우저 인쇄 기능을 사용해 보세요."
          : "Failed to generate PDF. Please try the browser print feature."
      );
    } finally {
      const temp = document.querySelector("body > div[style*='left: -9999px']");
      if (temp) temp.remove();
    }
  }, [language]);

  return {
    step,
    questionIndex,
    answers,
    photoPreview,
    result,
    startConsultation,
    selectAnswer,
    goNext,
    goPrevious,
    setPhoto,
    completeLoading,
    restart,
    downloadPdf,
  };
}
