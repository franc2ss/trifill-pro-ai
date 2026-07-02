type PremiumOutlineIconProps = { name: string; className?: string };

const paths: Record<string, React.ReactNode> = {
  lines: <><path d="M7 8.5c2-2 8-2 10 0M6 12c3-2 9-2 12 0M8 15.5c2-1.2 6-1.2 8 0"/><path d="M12 4v2M4.5 6.5l1.4 1M19.5 6.5l-1.4 1"/></>,
  sparkles: <><path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3Z"/><path d="m6 13 .8 2.2L9 16l-2.2.8L6 19l-.8-2.2L3 16l2.2-.8L6 13Zm12 1 .6 1.7 1.7.6-1.7.6L18 19l-.6-2.1-1.7-.6 1.7-.6L18 14Z"/></>,
  droplets: <><path d="M12 3.5S7 9 7 13a5 5 0 0 0 10 0c0-4-5-9.5-5-9.5Z"/><path d="M10 15.5c.7.8 1.7 1.1 2.8.8"/></>,
  palette: <><path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.2 0 1.7-.8 1.2-1.7-.6-1.1.2-2.3 1.5-2.3H17a3.5 3.5 0 0 0 3.5-3.5A9.5 9.5 0 0 0 12 3.5Z"/><circle cx="8" cy="9" r=".8"/><circle cx="12" cy="7" r=".8"/><circle cx="16" cy="9" r=".8"/></>,
  "circle-dot": <><circle cx="12" cy="12" r="8.5"/><circle cx="9" cy="10" r="1"/><circle cx="15" cy="9" r=".8"/><circle cx="14" cy="15" r="1.1"/><circle cx="8" cy="15" r=".7"/></>,
  heart: <><path d="M20 8.8c0 5-8 10-8 10s-8-5-8-10a4.3 4.3 0 0 1 7.7-2.6L12 7l.3-.8A4.3 4.3 0 0 1 20 8.8Z"/><path d="m8.5 12 2-2 1.8 3 2.2-3"/></>,
  "scan-face": <><path d="M7 3H4a1 1 0 0 0-1 1v3m14-4h3a1 1 0 0 1 1 1v3M7 21H4a1 1 0 0 1-1-1v-3m14 4h3a1 1 0 0 0 1-1v-3"/><path d="M8.5 10c.6-3.2 6.4-3.2 7 0v3.5a3.5 3.5 0 0 1-7 0V10Z"/></>,
  eye: <><path d="M3.5 12s3-5 8.5-5 8.5 5 8.5 5-3 5-8.5 5-8.5-5-8.5-5Z"/><circle cx="12" cy="12" r="2.5"/></>,
  smile: <><path d="M5 8c1.7-2.5 4-3.8 7-3.8S17.3 5.5 19 8M6 12c1.7 4 3.7 6 6 6s4.3-2 6-6"/><path d="M9 11h.01M15 11h.01"/></>,
  jawline: <><path d="M7 4.5c-1.1 2-1.5 4.5-1 7.2.6 3.4 3 6.4 6 8.3 3-1.9 5.4-4.9 6-8.3.5-2.7.1-5.2-1-7.2"/><path d="M8.2 14.5c1.1 1.7 2.4 2.8 3.8 3.5 1.4-.7 2.7-1.8 3.8-3.5M9 7.5c.7-.5 1.5-.8 3-.8s2.3.3 3 .8"/></>,
  user: <><circle cx="12" cy="8" r="4"/><path d="M4.5 20c.8-4.2 3.3-6.3 7.5-6.3s6.7 2.1 7.5 6.3"/></>,
  leaf: <><path d="M20 4C12 4 5 7 5 13c0 3.8 3 6 6.2 5.5C17 17.5 19.5 11 20 4Z"/><path d="M4 20c2.5-4 6-7 11-10"/></>,
  clock: <><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/></>,
  shield: <><path d="M12 3 5 6v5c0 4.7 2.7 7.8 7 10 4.3-2.2 7-5.3 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></>,
  "heart-handshake": <><path d="M12 19S4 14.8 4 9a4 4 0 0 1 7.2-2.4L12 8l.8-1.4A4 4 0 0 1 20 9c0 5.8-8 10-8 10Z"/><path d="m8 12 2-1.5 2 1.5 2-1.5 2 1.5"/></>,
  "badge-check": <><path d="m12 3 2.2 1.5 2.7-.1.7 2.6 2.2 1.6-.9 2.5.9 2.5-2.2 1.6-.7 2.6-2.7-.1L12 21l-2.2-1.5-2.7.1-.7-2.6-2.2-1.6.9-2.5-.9-2.5L6.4 7l.7-2.6 2.7.1L12 3Z"/><path d="m9 12 2 2 4-4"/></>,
};

export function PremiumOutlineIcon({ name, className = "h-6 w-6" }: PremiumOutlineIconProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">{paths[name] ?? paths.sparkles}</svg>;
}
