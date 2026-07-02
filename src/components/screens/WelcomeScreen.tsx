"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";

type WelcomeScreenProps = { onStart: () => void };

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const { t } = useLanguage();
  return (
    <div className="relative flex min-h-dvh flex-1 flex-col overflow-hidden px-6 pb-6 pt-10">
      <div
           className="pointer-events-none absolute inset-0"
           style={{
             background: `
               radial-gradient(circle at 82% 18%, rgba(233,184,98,.18), transparent 22%),
               radial-gradient(circle at 18% 72%, rgba(138,90,40,.10), transparent 34%),
               radial-gradient(circle at 50% 45%, rgba(255,255,255,.02), transparent 45%),
               linear-gradient(180deg, #111111 0%, #080808 35%, #050505 100%)
           `,
        }} 
     /> 
        <div className="pointer-events-none absolute bottom-[26%] left-[-20%] h-px w-[105%] -rotate-[19deg] bg-gradient-to-r from-transparent via-[#c79249]/50 to-transparent shadow-[0_0_28px_8px_rgba(172,111,42,.13)]" />

      <motion.main initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75 }} className="relative flex flex-1 flex-col">
        <div className="brightness-0 invert opacity-90">
          <Image src="/images/trifill-pro-logo.png" alt="Trifill PRO" width={210} height={64} priority className="h-auto w-[172px] object-contain" />
        </div>

        <div className="mt-9">
          <p className="text-[24px] font-light tracking-[.05em] text-[#d5a25a]">CO₂ + SOLUTION</p>
          <p className="mt-2 text-[10px] font-medium tracking-[.24em] text-stone-300">PRECISION DUAL DELIVERY</p>
        </div>

        <div className="mt-7 space-y-4 text-left max-w-[55%]">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#bd8b47]/60 text-[#d4a25d]">✦</span>
            <div><p className="text-[10px] tracking-[.1em] text-[#d4a25d]">CO₂ GAS</p><p className="mt-0.5 text-[9px] text-stone-500">Fine Particle Energy</p></div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#bd8b47]/60 text-[#d4a25d]">◊</span>
            <div><p className="text-[10px] tracking-[.1em] text-[#d4a25d]">SOLUTION</p><p className="mt-0.5 text-[9px] text-stone-500">Targeted Drug Delivery</p></div>
          </div>
        </div>

        <div className="pointer-events-none absolute right-[-26%] top-[42%] h-[103%] w-[103%] -translate-y-1/2">
          <Image src="/images/trifill-pro-new.png.png" alt="trifill-pro-new" fill priority className="object-contain" />
        </div>

        <div className="mt-auto pb-5 text-center">
          <h1 className="sr-only">{t.welcome.title}</h1>
          <p className="whitespace-pre-line text-[13px] leading-5 text-stone-300">{t.welcome.subtitle}</p>
        </div>
      </motion.main>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35 }} className="relative z-10">
        <div className="mb-4 text-center text-[9px] tracking-[.08em] text-stone-500">Powered by MCURE</div>
        <Button className="rounded-full" fullWidth showArrow onClick={onStart}>{t.welcome.start}</Button>
      </motion.div>
    </div>
  );
}
