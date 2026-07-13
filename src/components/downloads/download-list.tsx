import { ArrowUpRight, FileText } from "lucide-react";

export interface DownloadListItem {
  title: string;
  href: string;
}

export function DownloadList({ items }: { items: DownloadListItem[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="divide-y divide-border">
        {items.map((item, i) => (
          <a
            key={item.href + i}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-5 py-4 transition-colors hover:bg-accent/40"
          >
            <FileText className="size-4 shrink-0 text-muted-foreground" />
            <span className="flex-1 text-sm text-pretty group-hover:text-primary">{item.title}</span>
            <ArrowUpRight className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </a>
        ))}
      </div>
    </div>
  );
}
