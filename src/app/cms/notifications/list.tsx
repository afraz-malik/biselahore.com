"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AdminTable } from "@/components/cms/admin-table";
import { PublishToggle } from "@/components/cms/publish-toggle";
import { DeleteButton } from "@/components/cms/delete-button";
import { ReorderButtons } from "@/components/cms/reorder-buttons";
import { EditNotificationForm } from "./form";
import { deleteNotification, toggleNotificationPublished, reorderNotification } from "./actions";
import type { notifications } from "@/lib/db/schema";

type Row = typeof notifications.$inferSelect;

export function NotificationsList({ rows }: { rows: Row[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => row.title.toLowerCase().includes(q));
  }, [rows, query]);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search notifications…" className="pl-9" />
      </div>
      <AdminTable
        rows={filtered}
        emptyMessage="No notifications match your search."
        columns={[
          {
            header: "Title",
            render: (row) => (
              <span className="flex items-center gap-2">
                {row.title}
                {row.urgent ? <Badge variant="destructive">Urgent</Badge> : null}
                {row.showOnHome ? <Badge variant="secondary">Home</Badge> : null}
              </span>
            ),
          },
          { header: "Link", render: (row) => <span className="text-muted-foreground">{row.href}</span> },
        ]}
        actions={(row) => {
          const index = rows.findIndex((r) => r.id === row.id);
          return (
            <div className="flex items-center justify-end gap-1">
              <ReorderButtons id={row.id} canMoveUp={index > 0} canMoveDown={index < rows.length - 1} action={reorderNotification} />
              <PublishToggle id={row.id} isPublished={row.isPublished} action={toggleNotificationPublished} />
              <EditNotificationForm
                id={row.id}
                values={{
                  title: row.title,
                  href: row.href,
                  urgent: row.urgent,
                  showOnHome: row.showOnHome,
                  sortOrder: row.sortOrder,
                  isPublished: row.isPublished,
                }}
              />
              <DeleteButton id={row.id} label={row.title} action={deleteNotification} />
            </div>
          );
        }}
      />
    </div>
  );
}
