"use client";

import { ConsultationApp } from "@/components/ConsultationApp";
import { LanguageProvider } from "@/context/LanguageContext";

export default function Home() {
  return (
    <LanguageProvider>
      <ConsultationApp />
    </LanguageProvider>
  );
}
