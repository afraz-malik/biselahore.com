import Link from "next/link";
import { ArrowRight, ArrowUpRight, AlertCircle } from "lucide-react";

import { newsPreview } from "@/lib/home-data";
import { cn } from "@/lib/utils";

export function NewsPreview() {
  return (
    <div className="h-full rounded-2xl border border-border bg-card p-7 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-semibold">Latest News</h3>
        <Link
          href="/notifications"
          className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          View all
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
      <ul className="mt-5 divide-y divide-border">
        {newsPreview.map((item) => (
          <li key={item.title}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 py-3.5 text-base"
            >
              {item.urgent ? (
                <AlertCircle className="mt-0.5 size-4.5 shrink-0 text-destructive" />
              ) : (
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
              )}
              <span
                className={cn(
                  "flex-1 text-pretty group-hover:text-primary",
                  item.urgent && "font-medium text-foreground",
                )}
              >
                {item.title}
              </span>
              <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
