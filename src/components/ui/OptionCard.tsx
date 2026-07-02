"use client";

import { motion } from "framer-motion";
import { PremiumOutlineIcon } from "@/components/ui/PremiumOutlineIcon";

type OptionCardProps = {
  label: string;
  icon: string;
  selected: boolean;
  onClick: () => void;
  index?: number;
  compact?: boolean;
};

export function OptionCard({
  label,
  icon,
  selected,
  onClick,
  index = 0,
  compact = false,
}: OptionCardProps) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={[
        "group relative flex min-h-23 w-full items-center gap-4 overflow-hidden rounded-2xl border px-4 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9ad67]/40",
        compact ? "py-4 sm:px-4" : "py-5 sm:px-5",
        selected
          ? "border-[#d7a65c]/80 bg-gradient-to-br from-[#2b2115] to-[#17130e] shadow-[0_12px_36px_rgba(0,0,0,.24),inset_0_1px_0_rgba(255,220,160,.08)]"
          : "border-white/[.09] bg-white/[.045] hover:border-[#c99a55]/40 hover:bg-white/[.065]",
      ].join(" ")}
    >
      <div
        className={[
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-colors",
          selected
            ? "border-[#d9ad67]/50 bg-[#d9ad67]/10 text-[#edc77f]"
            : "border-white/[.07] bg-black/20 text-stone-500 group-hover:text-[#d9ad67]",
        ].join(" ")}
      >
        <PremiumOutlineIcon name={icon} className="h-6 w-6" />
      </div>

      <span
        className={[
          "flex-1 text-[15px] font-medium leading-snug",
          selected ? "text-[#fffaf0]" : "text-stone-300",
        ].join(" ")}
      >
        {label}
      </span>

      <div
        className={[
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all",
          selected
            ? "border-[#edc77f] bg-[#edc77f] text-black"
            : "border-white/20 bg-transparent",
        ].join(" ")}
      >
        {selected && (
          <motion.svg
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="h-3.5 w-3.5 text-black"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        )}
      </div>
    </motion.button>
  );
}
