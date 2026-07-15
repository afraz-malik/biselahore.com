import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const tones = {
  sky: "from-sky-600/90 via-blue-600/85 to-cyan-700/90",
  ocean: "from-blue-700/90 via-sky-700/85 to-cyan-800/90",
} as const;

export function ServiceCard({
  icon: Icon,
  title,
  description,
  tone = "sky",
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  tone?: keyof typeof tones;
}) {
  return (
    <div className="group relative flex h-full min-h-[13rem] flex-col justify-end overflow-hidden rounded-2xl border border-white/40 bg-white/40 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.45)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_-22px_rgba(37,99,235,0.5)] hover:ring-primary/30">
      {/* Document backdrop: a stylised certificate — ruled "text" lines and a wax-seal mark */}
      <div
        aria-hidden
        className={cn("absolute inset-0 bg-linear-to-br opacity-95", tones[tone])}
      >
        <div className="absolute inset-3.5 rounded-xl border border-white/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.35),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.22),transparent_35%)]" />
        <div className="absolute inset-x-7 top-8 flex flex-col gap-2.5">
          {[92, 78, 85, 60].map((w, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full bg-white/20"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
        <div className="absolute top-6 right-6 flex size-13 items-center justify-center rounded-full border-2 border-dashed border-gold/60">
          <span className="size-8 rounded-full bg-gold/25 ring-1 ring-gold/50" />
        </div>
      </div>

      {/* Overlay gradient so the title/description stay readable over the artwork */}
      <div className="absolute inset-0 bg-linear-to-t from-black/88 via-black/45 to-black/10 transition-colors duration-300 group-hover:from-black/92" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20 transition-opacity duration-300 group-hover:opacity-30">
        <svg viewBox="0 0 240 240" className="h-[72%] w-[72%] max-w-[180px]" aria-hidden>
          <rect x="48" y="34" width="144" height="172" rx="24" fill="white" />
          <path d="M76 70h88M76 96h88M76 122h60" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
          <circle cx="168" cy="154" r="30" fill="none" stroke="white" strokeWidth="10" />
          <path d="M152 154l12 12 22-24" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col gap-2.5 p-4 sm:p-5">
        <span className="flex size-10 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm transition-colors duration-300 group-hover:bg-gold group-hover:text-gold-foreground">
          <Icon className="size-5" />
        </span>
        <div>
          <p className="text-sm font-semibold text-white text-pretty">{title}</p>
          <p className="mt-1 text-xs leading-5 text-white/75 text-pretty">{description}</p>
        </div>
      </div>
    </div>
  );
}
