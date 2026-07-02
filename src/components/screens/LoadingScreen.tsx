"use client";

import { motion } from "framer-motion";
import { Check, ScanFace } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

type LoadingScreenProps = {
  onComplete: () => void;
};

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const { language, t } = useLanguage();
  const stages = language === "ko" ? ["설문 분석", "얼굴 이미지 분석", "육안 피부 특징 감지", "AI 상담 생성"] : ["Questionnaire Analysis", "Facial Image Analysis", "Visible Skin Feature Detection", "AI Consultation Generation"];
  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    const stepInterval = setInterval(() => {
      setCompletedSteps((prev) => {
        if (prev >= stages.length) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    const completeTimeout = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
      clearTimeout(completeTimeout);
    };
  }, [onComplete, stages.length]);

  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden px-6 pb-9 pt-8">
      <div className="absolute right-[-20%] top-[3%] h-[78%] w-px rotate-[20deg] bg-gradient-to-b from-transparent via-[#d7a65c]/50 to-transparent shadow-[0_0_45px_12px_rgba(201,154,85,.14)]" />
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 text-[27px] font-light tracking-[-.03em] text-stone-100"
      >
        {t.loading.title}
      </motion.h2>
      <p className="relative z-10 mt-3 text-sm text-stone-500">AI precision skin consultation</p>

      <div className="relative mt-10 h-60">
        <div className="pointer-events-none absolute -right-40 -top-2 h-64 w-[125%] opacity-90">
          <Image src="/images/handpiece.png" alt="Trifill PRO handpiece" fill className="object-contain object-right drop-shadow-[0_20px_35px_rgba(0,0,0,.9)]" />
        </div>
        <motion.div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-[85%] -translate-y-1/2 rounded-full border border-[#c99a55]/10" animate={{ scale: [1, 1.08, 1], opacity: [.4, .8, .4] }} transition={{ duration: 3, repeat: Infinity }} />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute left-1/2 top-1/2 -translate-x-[85%] -translate-y-1/2"
      >
        <div className="absolute inset-0 rounded-full bg-[#c99a55]/20 blur-3xl" />
        <svg width="180" height="180" viewBox="0 0 160 160" className="-rotate-90">
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="6"
          />
          <motion.circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="url(#loadingGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.1 }}
          />
          <defs>
            <linearGradient id="loadingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9F6E32" />
              <stop offset="100%" stopColor="#F0CB88" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <ScanFace className="mb-1 h-7 w-7 text-[#e5bc75]" strokeWidth={1.25} />
          </motion.div>
          <span className="text-3xl font-light text-[#f3d29a]">{progress}%</span>
        </div>
      </motion.div>
      </div>

      <ul className="relative mt-7 w-full space-y-0 pl-1">
        {stages.map((step, index) => {
          const isComplete = index < completedSteps;
          const isActive = index === completedSteps;

          return (
            <motion.li
              key={step}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="relative flex min-h-16 items-center gap-4 pl-1 transition-colors after:absolute after:left-[12px] after:top-[44px] after:h-8 after:w-px after:bg-white/10 last:after:hidden"
            >
              <div
                className={[
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                  isComplete
                    ? "bg-[#d7aa65] text-black"
                    : isActive
                      ? "border border-[#d7aa65] bg-[#d7aa65]/10"
                      : "border border-white/20 bg-[#080808]",
                ].join(" ")}
              >
                {isComplete && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                {isActive && !isComplete && (
                  <motion.div
                    className="h-2 w-2 rounded-full bg-[#e8c17b]"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </div>
              <span
                className={[
                  "text-[14px] transition-colors duration-300",
                  isComplete
                    ? "font-medium text-white"
                    : isActive
                      ? "text-[#e4bd78]"
                      : "text-white/40",
                ].join(" ")}
              >
                {step}
              </span>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
