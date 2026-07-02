"use client";

import { motion } from "framer-motion";
import { Camera, CloudUpload, ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { Card } from "@/components/ui/Card";
import { useLanguage } from "@/context/LanguageContext";

type PhotoUploadScreenProps = {
  photoPreview: string | null;
  onPhotoChange: (preview: string | null) => void;
};

export function PhotoUploadScreen({
  photoPreview,
  onPhotoChange,
}: PhotoUploadScreenProps) {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file: File | undefined) => {
      if (!file || !file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        onPhotoChange(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    },
    [onPhotoChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFile(e.dataTransfer.files[0]);
    },
    [handleFile]
  );

  const instructions = [
    t.photoUpload.instruction1,
    t.photoUpload.instruction2,
    t.photoUpload.instruction3,
  ];

  return (
    <div className="flex flex-1 flex-col justify-start gap-6 px-5 pb-8 pt-6 sm:px-7">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-[25px] font-light leading-snug tracking-[-.025em] text-[#f6f2ea]">
          {t.photoUpload.title}
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-6"
      >
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={[
            "relative flex w-full flex-col items-center justify-center overflow-visible rounded-2xl border px-5 py-8 transition-all sm:px-8 sm:py-12 max-h-[65vh] min-h-[350px]",
            isDragging
              ? "border-[#e3b76e] bg-[#c99a55]/10"
              : "border-[#c99a55]/35 bg-gradient-to-b from-white/[.055] to-white/[.015]",
          ].join(" ")}
        >
          <div className="pointer-events-none absolute inset-x-12 top-0 h-32 rounded-full bg-[#c99a55]/10 blur-3xl" />
          <img
            src="/images/face.png"
            alt="Face placeholder"
            className="mx- mb-[-100px] max-w-[230px] w-full h-auto object-contain"
          />
          <div className="relative mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-b from-[#f0cf96] to-[#bd8642] text-black shadow-[0_0_25px_rgba(208,157,83,.25)]">
            <CloudUpload className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <p className="relative text-base font-medium text-stone-200 text-center">
            {t.photoUpload.dragDrop}
          </p>
          <p className="mt-2 text-xs text-stone-600">or</p>

          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex min-w-[130px] items-center justify-center gap-2 rounded-xl border border-[#c99a55]/60 bg-transparent px-5 py-3 text-sm font-medium text-[#e2b873] transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <ImageIcon className="h-4 w-4" />
              {t.photoUpload.browse}
            </button>
            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              className="inline-flex min-w-[130px] items-center justify-center gap-2 rounded-xl border border-white/15 bg-transparent px-5 py-3 text-sm font-medium text-stone-300 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Camera className="h-4 w-4" />
              {t.photoUpload.camera}
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="user"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </div>
      </motion.div>

      {photoPreview && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-5"
        >
          <div className="relative mx-auto w-fit">
            <div className="relative h-32 w-32 overflow-hidden rounded-2xl shadow-lg ring-2 ring-primary/20">
              <Image
                src={photoPreview}
                alt="Preview"
                width={128}
                height={128}
                className="object-cover"
                unoptimized
              />
            </div>
            <button
              type="button"
              onClick={() => onPhotoChange(null)}
              className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black text-stone-200 shadow-md transition-transform hover:scale-105"
              aria-label={t.photoUpload.remove}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-6"
      >
        <Card>
          <h3 className="mb-4 text-sm font-medium text-[#e6bd78]">
            {t.photoUpload.instructionTitle}
          </h3>
          <ul className="space-y-2.5">
            {instructions.map((text, i) => (
              <li key={i} className="flex items-start gap-3 text-sm leading-6 text-stone-400">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#c99a55]/40 text-[10px] font-medium text-[#e6bd78]">
                  {i + 1}
                </span>
                {text}
              </li>
            ))}
          </ul>
        </Card>
      </motion.div>
    </div>
  );
}
