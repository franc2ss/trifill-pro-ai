import type { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
  variant?: "light" | "dark";
  footer?: ReactNode;
};

export function AppShell({
  children,
  variant = "light",
  footer,
}: AppShellProps) {
  return (
    <div
      className={[
        "relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col overflow-visible border-x border-white/[.06] shadow-[0_0_90px_rgba(0,0,0,.8)]",
        variant === "dark"
          ? "bg-[radial-gradient(circle_at_80%_4%,rgba(126,88,41,.22)_0%,transparent_30%),radial-gradient(circle_at_10%_65%,rgba(78,55,28,.12)_0%,transparent_32%),#080808] text-[#f5f1e9]"
          : "bg-background text-[#f5f1e9]",
      ].join(" ")}
    >
      <div className="flex flex-1 flex-col pb-28">{children}</div>
      {footer && (
        <div className="sticky bottom-0 z-40 border-t border-white/[.08] bg-[#090909]/90 px-5 py-4 backdrop-blur-xl">
          {footer}
        </div>
      )}
    </div>
  );
}
