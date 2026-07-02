"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type MetricCardProps = {
  label: string;
  score: number;
  maxScore: number;
  icon: LucideIcon;
  index?: number;
};

export function MetricCard({
  label,
  score,
  maxScore,
  icon: Icon,
  index = 0,
}: MetricCardProps) {
  const percentage = (score / maxScore) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="rounded-none border-0 border-b border-white/[.07] bg-transparent px-3 py-3.5 last:border-b-0"
    >
      <div className="mb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#c99a55]/25 bg-[#c99a55]/[.06]">
            <Icon className="h-4 w-4 text-[#dcb46f]" strokeWidth={1.5} />
          </div>
          <span className="text-sm font-medium text-stone-300">{label}</span>
        </div>
        <span className="text-sm font-semibold text-stone-100">
          {score}
          <span className="font-normal text-stone-600">/{maxScore}</span>
        </span>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-white/[.07]">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#a97939] to-[#e9c17b]"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ delay: 0.2 + index * 0.08, duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}
