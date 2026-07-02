"use client";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { LanguageSwitch } from "./LanguageSwitch";
import { useLanguage } from "@/context/LanguageContext";

type HeaderProps = {
  showBack?: boolean;
  onBack?: () => void;
  transparent?: boolean;
  dark?: boolean;
};

export function Header({
  showBack = false,
  onBack,
  transparent = false,
  dark = false,
}: HeaderProps) {
  const { t } = useLanguage();

  return (
    <header
      className={[
        "sticky top-0 z-50 flex items-center justify-between px-5 py-5",
        transparent ? "bg-transparent" : "border-b border-white/[.06] bg-[#080808]/80 backdrop-blur-xl",
      ].join(" ")}
    >
      <div className="flex items-center gap-3">
        {showBack && onBack && (
          <button
            type="button"
            onClick={onBack}
            className={[
              "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
              dark
                ? "border border-white/10 bg-white/[.06] text-[#e8c27d] hover:bg-white/10"
                : "border border-white/10 bg-white/[.06] text-[#e8c27d] hover:bg-white/10",
            ].join(" ")}
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}
        <div className="flex items-center gap-2">
          <div className={dark ? "brightness-0 invert opacity-90" : ""}>
            <Image src="/images/trifill-pro-logo.png" alt={t.appName} width={105} height={32} className="h-7 w-auto object-contain" />
          </div>
        </div>
      </div>
      <LanguageSwitch />
    </header>
  );
}
