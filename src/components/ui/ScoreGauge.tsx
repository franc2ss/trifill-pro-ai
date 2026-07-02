"use client";

import { motion } from "framer-motion";

type ScoreGaugeProps = {
  score: number;
  maxScore: number;
  label: string;
  status: string;
};

export function ScoreGauge({ score, maxScore, label, status }: ScoreGaugeProps) {
  const percentage = (score / maxScore) * 100;
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative flex min-h-56 w-full items-center justify-center overflow-visible"
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-90">
        <svg width="190" height="190" viewBox="0 0 120 120" className="-rotate-90">
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="rgba(255,255,255,.08)"
            strokeWidth="5"
          />
          <motion.circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          />
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9F6E32" />
              <stop offset="100%" stopColor="#F0CB88" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <div className="flex items-end gap-1">
          <span className="text-5xl font-light tracking-[-.04em] text-[#d5a25c]">{score}</span>
          <span className="mb-1 text-sm text-stone-400">/{maxScore}</span>
        </div>
        <p className="mt-3 text-[11px] text-stone-300">{label}</p>
        <span className="mt-2 rounded-full border border-[#c99a55]/30 bg-black/20 px-3 py-1 text-[10px] font-medium text-[#e6bd78]">{status}</span>
      </div>
    </motion.div>
  );
}
