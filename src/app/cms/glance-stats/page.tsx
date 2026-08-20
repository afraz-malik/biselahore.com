import { asc } from "drizzle-orm";

import { db } from "@/lib/db/client";
import { glanceStats } from "@/lib/db/schema";
import { AdminTable } from "@/components/cms/admin-table";
import { PublishToggle } from "@/components/cms/publish-toggle";
import { DeleteButton } from "@/components/cms/delete-button";
import { ReorderButtons } from "@/components/cms/reorder-buttons";
import { CreateGlanceStatForm, EditGlanceStatForm } from "./form";
import { deleteGlanceStat, toggleGlanceStatPublished, reorderGlanceStat } from "./actions";

export default async function GlanceStatsPage() {
  const rows = await db.select().from(glanceStats).orderBy(asc(glanceStats.sortOrder)).all();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">BISE at a Glance</h1>
          <p className="text-sm text-muted-foreground">Homepage credibility stat cards.</p>
        </div>
        <CreateGlanceStatForm nextSortOrder={rows.length} />
      </div>

      <AdminTable
        rows={rows}
        emptyMessage="No stats yet."
        columns={[
          { header: "Title", render: (row) => row.title },
          { header: "Icon", render: (row) => <span className="text-muted-foreground">{row.icon}</span> },
          {
            header: "Value",
            render: (row) =>
              row.value !== null
                ? `${row.prefix ?? ""}${row.value}${row.suffix ?? ""}`
                : <span className="text-muted-foreground">—</span>,
          },
        ]}
        actions={(row, index) => (
          <div className="flex items-center justify-end gap-1">
            <ReorderButtons id={row.id} canMoveUp={index > 0} canMoveDown={index < rows.length - 1} action={reorderGlanceStat} />
            <PublishToggle id={row.id} isPublished={row.isPublished} action={toggleGlanceStatPublished} />
            <EditGlanceStatForm
              id={row.id}
              values={{
                icon: row.icon,
                value: row.value ?? undefined,
                decimals: row.decimals ?? undefined,
                prefix: row.prefix ?? undefined,
                suffix: row.suffix ?? undefined,
                title: row.title,
                subtitle: row.subtitle ?? undefined,
                sortOrder: row.sortOrder,
                isPublished: row.isPublished,
              }}
            />
            <DeleteButton id={row.id} label={row.title} action={deleteGlanceStat} />
          </div>
        )}
      />
    </div>
  );
}
