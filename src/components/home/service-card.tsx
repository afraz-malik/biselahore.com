import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const tones = {
  emerald: "from-primary via-primary/95 to-[#0b2a20]",
  ink: "from-[#122421] via-[#0c1b17] to-[#050f0c]",
} as const;

export function ServiceCard({
  icon: Icon,
  title,
  description,
  tone = "emerald",
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  tone?: keyof typeof tones;
}) {
  return (
    <div className="group relative flex h-full min-h-60 flex-col justify-end overflow-hidden rounded-3xl shadow-md ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-primary/30">
      {/* Document backdrop: a stylised certificate — ruled "text" lines and a wax-seal mark */}
      <div
        aria-hidden
        className={cn("absolute inset-0 bg-linear-to-br", tones[tone])}
      >
        <div className="absolute inset-3.5 rounded-xl border border-white/20" />
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
      <div className="absolute inset-0 bg-linear-to-t from-black/88 via-black/40 to-black/5 transition-colors duration-300 group-hover:from-black/92" />

      <div className="relative z-10 flex flex-col gap-3.5 p-6 sm:p-7">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm transition-colors duration-300 group-hover:bg-gold group-hover:text-gold-foreground">
          <Icon className="size-6" />
        </span>
        <div>
          <p className="text-base font-semibold text-white text-pretty">{title}</p>
          <p className="mt-1.5 text-sm text-white/75 text-pretty">{description}</p>
        </div>
      </div>
    </div>
  );
}
