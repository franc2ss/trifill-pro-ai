"use client";

import { motion } from "framer-motion";

type ProgressBarProps = {
  current: number;
  total: number;
  showLabel?: boolean;
  label?: string;
};

export function ProgressBar({
  current,
  total,
  showLabel = true,
  label,
}: ProgressBarProps) {
  const progress = Math.min((current / total) * 100, 100);

  return (
    <div className="w-full">
      {showLabel && (
        <div className="mb-3 flex items-center justify-between text-xs tracking-[.08em]">
          <span className="font-medium text-stone-300">
            {label ?? `${current} / ${total}`}
          </span>
          <span className="font-medium text-[#d7ad6b]">{Math.round(progress)}%</span>
        </div>
      )}
      <div className="h-1 overflow-hidden rounded-full bg-white/[.08]">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#a87335] to-[#efc681] shadow-[0_0_12px_rgba(224,185,113,.35)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
