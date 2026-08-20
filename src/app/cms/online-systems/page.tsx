import { asc } from "drizzle-orm";

import { db } from "@/lib/db/client";
import { onlineSystems } from "@/lib/db/schema";
import { AdminTable } from "@/components/cms/admin-table";
import { PublishToggle } from "@/components/cms/publish-toggle";
import { DeleteButton } from "@/components/cms/delete-button";
import { ReorderButtons } from "@/components/cms/reorder-buttons";
import { Badge } from "@/components/ui/badge";
import { CreateOnlineSystemForm, EditOnlineSystemForm } from "./form";
import { deleteOnlineSystem, toggleOnlineSystemPublished, reorderOnlineSystem } from "./actions";

export default async function OnlineSystemsPage() {
  const rows = await db.select().from(onlineSystems).orderBy(asc(onlineSystems.sortOrder)).all();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Online Systems</h1>
          <p className="text-sm text-muted-foreground">Homepage &quot;Online Systems&quot; grid.</p>
        </div>
        <CreateOnlineSystemForm nextSortOrder={rows.length} />
      </div>

      <AdminTable
        rows={rows}
        emptyMessage="No online systems yet."
        columns={[
          {
            header: "Title",
            render: (row) => (
              <span className="flex items-center gap-2">
                {row.title}
                {row.featured ? <Badge>Featured</Badge> : null}
              </span>
            ),
          },
          { header: "Link", render: (row) => <span className="text-muted-foreground">{row.href}</span> },
        ]}
        actions={(row, index) => (
          <div className="flex items-center justify-end gap-1">
            <ReorderButtons id={row.id} canMoveUp={index > 0} canMoveDown={index < rows.length - 1} action={reorderOnlineSystem} />
            <PublishToggle id={row.id} isPublished={row.isPublished} action={toggleOnlineSystemPublished} />
            <EditOnlineSystemForm
              id={row.id}
              values={{
                title: row.title,
                href: row.href,
                description: row.description ?? "",
                featured: row.featured,
                sortOrder: row.sortOrder,
                isPublished: row.isPublished,
              }}
            />
            <DeleteButton id={row.id} label={row.title} action={deleteOnlineSystem} />
          </div>
        )}
      />
    </div>
  );
}
