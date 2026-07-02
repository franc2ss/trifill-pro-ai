"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  showArrow?: boolean;
  loading?: boolean;
  children: ReactNode;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-[#d0a05a] via-[#f0d08f] to-[#c19452] text-[#100d08] border border-[#c99a55]/30 shadow-[0_16px_45px_rgba(201,154,85,.22)] hover:brightness-105 active:scale-[0.98]",
  secondary:
    "bg-white/[.04] text-stone-200 border border-white/10 hover:bg-white/[.08] active:scale-[0.98]",
  ghost: "bg-transparent text-[#dbb16d] hover:bg-white/[.04]",
};

export function Button({
  variant = "primary",
  fullWidth = false,
  showArrow = false,
  loading = false,
  disabled,
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={[
        "inline-flex min-h-13 items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-[14px] font-semibold tracking-[.02em] transition-all duration-300",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variantStyles[variant],
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {loading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <>
          {children}
          {showArrow && variant === "primary" && (
            <ArrowRight className="h-4 w-4" />
          )}
        </>
      )}
    </button>
  );
}
