import Link from "next/link";
import { ArrowRight, ArrowUpRight, AlertCircle } from "lucide-react";

import { newsPreview } from "@/lib/home-data";
import { cn } from "@/lib/utils";

export function NewsPreview() {
  return (
    <div className="h-full rounded-3xl border border-sky-200/80 bg-gradient-to-br from-sky-50 via-white to-blue-50 p-7 shadow-[0_25px_70px_-35px_rgba(37,99,235,0.35)]">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-semibold text-slate-900">Latest News</h3>
        <Link
          href="/notifications"
          className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-blue-700 transition-colors hover:text-blue-900"
        >
          View all
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
      <ul className="mt-5 space-y-3">
        {newsPreview.map((item, index) => {
          const palette = [
            "bg-gradient-to-r from-sky-600 to-blue-700 text-white",
            "bg-gradient-to-r from-cyan-600 to-sky-700 text-white",
            "bg-gradient-to-r from-blue-700 to-indigo-700 text-white",
          ];
          const accent = palette[index % palette.length];

          return (
            <li key={item.title}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group flex items-start gap-3 rounded-2xl border border-white/60 p-3.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
                  accent,
                )}
              >
                {item.urgent ? (
                  <AlertCircle className="mt-0.5 size-4.5 shrink-0 text-white/90" />
                ) : (
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-white/80" />
                )}
                <span className="flex-1 text-pretty text-sm font-medium leading-6">
                  {item.title}
                </span>
                <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-white/90 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
