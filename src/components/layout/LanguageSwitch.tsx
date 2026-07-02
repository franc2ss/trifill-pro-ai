"use client";

import { ChevronDown, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative">
      <label htmlFor="language-select" className="sr-only">
        Language
      </label>
      <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
        <Globe className="h-4 w-4 text-[#d7ad6b]" strokeWidth={1.5} />
      </div>
      <select
        id="language-select"
        value={language}
        onChange={(e) => setLanguage(e.target.value as "ko" | "en")}
        className="appearance-none rounded-full border border-white/10 bg-white/[.04] py-2 pl-9 pr-8 text-xs font-medium text-stone-200 transition-colors hover:border-[#c99a55]/50 focus:border-[#c99a55] focus:outline-none focus:ring-2 focus:ring-[#c99a55]/15"
      >
        <option value="ko">한국어</option>
        <option value="en">English</option>
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
    </div>
  );
}
