"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AdminTable } from "@/components/cms/admin-table";
import { PublishToggle } from "@/components/cms/publish-toggle";
import { DeleteButton } from "@/components/cms/delete-button";
import { ReorderButtons } from "@/components/cms/reorder-buttons";
import { EditDeputationistForm } from "./form";
import { deleteDeputationist, toggleDeputationistPublished, reorderDeputationist } from "./actions";
import type { deputationists } from "@/lib/db/schema";

type Row = typeof deputationists.$inferSelect;

export function DeputationistsList({ rows }: { rows: Row[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => row.name.toLowerCase().includes(q));
  }, [rows, query]);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name…" className="pl-9" />
      </div>
      <AdminTable
        rows={filtered}
        emptyMessage="No entries match your search."
        columns={[
          { header: "No.", render: (row) => row.no, className: "w-16" },
          { header: "Name", render: (row) => row.name },
          { header: "From", render: (row) => <span className="text-muted-foreground">{row.fromDate}</span> },
          {
            header: "To",
            render: (row) => (row.toDate ? <span className="text-muted-foreground">{row.toDate}</span> : <Badge>Incumbent</Badge>),
          },
        ]}
        actions={(row) => {
          const index = rows.findIndex((r) => r.id === row.id);
          return (
            <div className="flex items-center justify-end gap-1">
              <ReorderButtons id={row.id} canMoveUp={index > 0} canMoveDown={index < rows.length - 1} action={reorderDeputationist} />
              <PublishToggle id={row.id} isPublished={row.isPublished} action={toggleDeputationistPublished} />
              <EditDeputationistForm
                id={row.id}
                values={{
                  group: row.group,
                  no: row.no,
                  name: row.name,
                  fromDate: row.fromDate,
                  toDate: row.toDate ?? undefined,
                  sortOrder: row.sortOrder,
                  isPublished: row.isPublished,
                }}
              />
              <DeleteButton id={row.id} label={row.name} action={deleteDeputationist} />
            </div>
          );
        }}
      />
    </div>
  );
}
