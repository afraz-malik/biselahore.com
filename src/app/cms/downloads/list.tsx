"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { AdminTable } from "@/components/cms/admin-table";
import { PublishToggle } from "@/components/cms/publish-toggle";
import { DeleteButton } from "@/components/cms/delete-button";
import { ReorderButtons } from "@/components/cms/reorder-buttons";
import { EditTitleHrefForm } from "@/components/cms/title-href-form";
import { downloadSchema } from "@/lib/cms/schemas";
import { updateDownload, deleteDownload, toggleDownloadPublished, reorderDownload } from "./actions";
import type { downloads } from "@/lib/db/schema";

type Row = typeof downloads.$inferSelect;

export function DownloadsList({ rows }: { rows: Row[] }) {
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
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search downloads…" className="pl-9" />
      </div>
      <AdminTable
        rows={filtered}
        emptyMessage="No downloads match your search."
        columns={[
          { header: "Title", render: (row) => row.title },
          { header: "Link", render: (row) => <span className="text-muted-foreground">{row.href}</span> },
        ]}
        actions={(row) => {
          const index = rows.findIndex((r) => r.id === row.id);
          return (
            <div className="flex items-center justify-end gap-1">
              <ReorderButtons id={row.id} canMoveUp={index > 0} canMoveDown={index < rows.length - 1} action={reorderDownload} />
              <PublishToggle id={row.id} isPublished={row.isPublished} action={toggleDownloadPublished} />
              <EditTitleHrefForm
                schema={downloadSchema}
                values={{ title: row.title, href: row.href, sortOrder: row.sortOrder, isPublished: row.isPublished }}
                onSubmit={(data) => updateDownload(row.id, data)}
                entityLabel="download"
              />
              <DeleteButton id={row.id} label={row.title} action={deleteDownload} />
            </div>
          );
        }}
      />
    </div>
  );
}
