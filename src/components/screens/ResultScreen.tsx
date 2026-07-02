"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  CircleDot,
  Download,
  Droplets,
  Palette,
  RefreshCw,
  Sparkles,
  Star,
  Waves,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MetricCard } from "@/components/ui/MetricCard";
import { ScoreGauge } from "@/components/ui/ScoreGauge";
import { useLanguage } from "@/context/LanguageContext";
import type { ConsultationResult } from "@/types";

type ResultScreenProps = {
  result: ConsultationResult;
  onRestart: () => void;
  onDownloadPdf: () => void;
};

const metricIcons = {
  elasticity: Waves,
  pores: CircleDot,
  wrinkles: Sparkles,
  texture: Droplets,
  skinTone: Palette,
};

export function ResultScreen({
  result,
  onRestart,
  onDownloadPdf,
}: ResultScreenProps) {
  const { language, t } = useLanguage();
  const copy = language === "ko" ? {
    title: "추천 상담 프로그램", program: "Trifill PRO 맞춤 상담", reason: "추천 이유", reasonText: `${result.mainConcern}에 대한 상담 목표와 설문 응답을 바탕으로 구성된 프로그램입니다.`, benefits: "기대할 수 있는 상담 방향", benefitsText: "피부 고민을 체계적으로 검토하고 개인의 우선순위에 맞춘 상담 계획 수립을 지원합니다.", platform: "지원 플랫폼", powered: "Powered by Trifill PRO", learn: "자세히 보기", official: "공식 웹사이트",
  } : {
    title: "Recommended Consultation Program", program: "Trifill PRO Personalized Consultation", reason: "Recommendation Reason", reasonText: `Designed around your consultation goals for ${result.mainConcern.toLowerCase()} and your questionnaire responses.`, benefits: "Expected Benefits", benefitsText: "A structured review of visible skin concerns and a consultation plan aligned with your personal priorities.", platform: "Supported Platform", powered: "Powered by Trifill PRO", learn: "Learn More", official: "Official Website",
  };

  const metricLabels: Record<string, string> = {
    elasticity: t.result.elasticity,
    pores: t.result.pores,
    wrinkles: t.result.wrinkles,
    texture: t.result.texture,
    skinTone: t.result.skinTone,
  };

  return (
    <div data-pdf-root className="flex flex-1 flex-col px-5 pb-8 sm:px-7">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[.28em] text-[#b88a4c]">AI skin consultation</p>
        <h2 className="text-[25px] font-light tracking-[-.025em] text-[#f6f2ea]">
          {t.result.title}
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-6"
      >
        <Card className="relative flex flex-col items-center overflow-visible bg-[radial-gradient(circle_at_75%_35%,rgba(201,154,85,.13),transparent_50%)] px-3 py-6 sm:py-4">
          <ScoreGauge
            score={result.overallScore}
            maxScore={100}
            label={t.result.overallScore}
            status={result.status}
          />
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-4 grid grid-cols-2 gap-3"
      >
        <Card padding="sm">
          <p className="text-[10px] font-medium uppercase tracking-[.12em] text-stone-500">{t.result.skinType}</p>
          <p className="mt-2 text-base font-medium text-stone-100">{result.skinType}</p>
        </Card>
        <Card padding="sm">
          <p className="text-[10px] font-medium uppercase tracking-[.12em] text-stone-500">{t.result.mainConcern}</p>
          <p className="mt-2 text-base font-medium text-stone-100">{result.mainConcern}</p>
        </Card>
      </motion.div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-white/[.1] bg-black/20 px-2">
        {result.metrics.map((metric, index) => (
          <MetricCard
            key={metric.id}
            label={metricLabels[metric.id] ?? metric.id}
            score={metric.score}
            maxScore={metric.maxScore}
            icon={metricIcons[metric.id as keyof typeof metricIcons] ?? Sparkles}
            index={index}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="mt-6"
      >
        <Card>
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#c99a55]/25 bg-[#c99a55]/10">
              <Sparkles className="h-4 w-4 text-[#dfb56f]" />
            </div>
            <h3 className="text-base font-medium text-stone-100">{t.result.aiSummary}</h3>
          </div>
          <p className="text-sm leading-7 text-stone-400">{result.aiSummary}</p>
        </Card>
      </motion.div>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: .7 }} className="mt-10 overflow-hidden rounded-[2rem] border border-[#c99a55]/20 bg-black/40 text-white shadow-[0_24px_70px_rgba(0,0,0,.35)]">
        <div className="px-5 pb-7 pt-7 sm:px-7">
          <p className="text-[10px] font-semibold uppercase tracking-[.24em] text-[#d9ad67]">Trifill PRO</p>
          <h3 className="mt-2 text-2xl font-light leading-tight tracking-tight">{copy.title}</h3>
          <div className="relative mt-6 flex min-h-56 items-center justify-center overflow-hidden rounded-[1.5rem] bg-[#080808]">
            <div className="absolute inset-0 bg-[#090909]" />
            <Image src="/images/trifill-pro-new.png.png" alt="Trifill PRO device" width={360} height={260} className="relative h-52 w-auto object-contain" />
          </div>
          <h4 className="mt-6 text-xl font-light">{copy.program}</h4>
          <div className="mt-5 space-y-4">
            <div className="border-l border-[#c99a55]/50 pl-4"><p className="text-xs font-medium uppercase tracking-wider text-[#d9ad67]">{copy.reason}</p><p className="mt-2 text-sm leading-6 text-stone-400">{copy.reasonText}</p></div>
            <div className="border-l border-[#c99a55]/50 pl-4"><p className="text-xs font-medium uppercase tracking-wider text-[#d9ad67]">{copy.benefits}</p><p className="mt-2 text-sm leading-6 text-stone-400">{copy.benefitsText}</p></div>
          </div>
        </div>
        <div id="supported-platform" className="border-t border-[#2a2a2a] bg-[#080808] px-5 py-6 sm:px-7">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-stone-500">{copy.platform}</p>
          <div className="mt-4 flex items-center gap-4"><div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-[#333] bg-[#0b0b0b]"><Image src="/images/handpiece.png" alt="Trifill PRO handpiece" width={100} height={100} className="h-20 w-20 object-contain" /></div><div><p className="text-base font-semibold">{copy.powered}</p><p className="mt-1 text-xs leading-5 text-stone-500">Professional consultation platform</p></div></div>
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="mt-4"
      >
        <Card>
          <h3 className="mb-4 text-base font-medium text-stone-100">
            {t.result.recommendedConsultation}
          </h3>
          <ul className="space-y-3">
            {result.recommendations.map((rec, i) => (
              <li key={i} className="flex items-center justify-between">
                <span className="text-sm font-medium text-stone-300">{rec.title}</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className={[
                        "h-4 w-4",
                        starIndex < rec.stars
                          ? "fill-primary text-primary"
                          : "fill-white/[.04] text-white/10",
                      ].join(" ")}
                    />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        className="mt-8 grid grid-cols-2 gap-3"
      >
        <a href="https://mcure.co.kr" target="_blank" rel="noreferrer" className="inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#d0a05a] via-[#f0d08f] to-[#c19452] text-[#100d08] border border-[#c99a55]/30 shadow-[0_16px_45px_rgba(201,154,85,.22)] px-3 text-sm font-medium">{copy.official}<ExternalLink className="h-4 w-4" /></a>
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-xl border border-[#c99a55]/40 bg-[#c99a55]/[.06] px-3 text-sm font-medium text-[#dfb56f]"
        >
          <RefreshCw className="h-4 w-4" />
          {t.result.restart}
        </button>
      </motion.div>

      <footer className="mt-10 flex flex-col items-center border-t border-[#222] py-8 text-center"><span className="text-[10px] font-semibold uppercase tracking-[.2em] text-stone-600">Powered by MCURE</span></footer>
    </div>
  );
}
