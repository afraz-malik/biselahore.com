import Image from "next/image";

import { cn } from "@/lib/utils";

const tones = {
  sky: "from-sky-600/90 via-blue-600/85 to-cyan-700/90",
  ocean: "from-blue-700/90 via-sky-700/85 to-cyan-800/90",
} as const;

export function ServiceCard({
  imageSrc,
  title,
  description,
  tone = "sky",
}: {
  imageSrc: string;
  title: string;
  description: string;
  tone?: keyof typeof tones;
}) {
  return (
    <div className="group relative flex h-full min-h-[15rem] flex-col justify-end overflow-hidden rounded-2xl border border-white/40 bg-white/40 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.45)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_-22px_rgba(37,99,235,0.5)] hover:ring-primary/30">
      {/* Clean gradient backdrop for service cards */}
      <div
        aria-hidden
        className={cn("absolute inset-0 bg-linear-to-br opacity-95", tones[tone])}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.35),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.22),transparent_35%)]" />
      </div>

      {/* Overlay gradient so the title/description stay readable over the artwork */}
      <div className="absolute inset-0 bg-linear-to-t from-black/88 via-black/45 to-black/10 transition-colors duration-300 group-hover:from-black/92" />

      <div className="relative z-20 flex h-full flex-col justify-between gap-4 p-4 sm:p-5">
        <div className="flex justify-center pt-1 sm:pt-2">
          <Image
            src={imageSrc}
            alt=""
            width={160}
            height={160}
            className="h-24 w-24 object-contain sm:h-28 sm:w-28"
            aria-hidden
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-white text-pretty">{title}</p>
          <p className="mt-1 text-xs leading-5 text-white/75 text-pretty">{description}</p>
        </div>
      </div>
    </div>
  );
}
