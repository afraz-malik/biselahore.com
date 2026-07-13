"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { DownloadList } from "@/components/downloads/download-list";
import type { NotificationEntry } from "@/lib/notifications-data";

export function NotificationBrowser({ items }: { items: NotificationEntry[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => item.title.toLowerCase().includes(q));
  }, [items, query]);

  return (
    <div>
      <div className="relative mb-6 max-w-md">
        <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search notifications…"
          className="h-11 pl-10"
        />
      </div>
      <p className="mb-4 text-sm text-muted-foreground">
        {filtered.length} of {items.length} notifications
      </p>
      {filtered.length > 0 ? (
        <DownloadList items={filtered} />
      ) : (
        <p className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No notifications match &ldquo;{query}&rdquo;.
        </p>
      )}
    </div>
  );
}
