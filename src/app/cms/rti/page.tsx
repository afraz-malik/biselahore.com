import { asc } from "drizzle-orm";

import { db } from "@/lib/db/client";
import { rtiItems } from "@/lib/db/schema";
import { AdminTable } from "@/components/cms/admin-table";
import { PublishToggle } from "@/components/cms/publish-toggle";
import { DeleteButton } from "@/components/cms/delete-button";
import { ReorderButtons } from "@/components/cms/reorder-buttons";
import { Badge } from "@/components/ui/badge";
import { CreateRtiItemForm, EditRtiItemForm } from "./form";
import { deleteRtiItem, toggleRtiItemPublished, reorderRtiItem } from "./actions";

export default async function RtiAdminPage() {
  const rows = await db.select().from(rtiItems).orderBy(asc(rtiItems.sortOrder)).all();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">RTI (Proactive Disclosure)</h1>
          <p className="text-sm text-muted-foreground">Statutory disclosure table at /rti.</p>
        </div>
        <CreateRtiItemForm nextSortOrder={rows.length} />
      </div>

      <AdminTable
        rows={rows}
        emptyMessage="No RTI items yet."
        columns={[
          { header: "Label", render: (row) => row.label, className: "w-16" },
          {
            header: "Description",
            render: (row) => (
              <span className="flex items-center gap-2">
                {row.description}
                {row.notApplicable ? <Badge variant="secondary">N/A</Badge> : null}
              </span>
            ),
          },
        ]}
        actions={(row, index) => (
          <div className="flex items-center justify-end gap-1">
            <ReorderButtons id={row.id} canMoveUp={index > 0} canMoveDown={index < rows.length - 1} action={reorderRtiItem} />
            <PublishToggle id={row.id} isPublished={row.isPublished} action={toggleRtiItemPublished} />
            <EditRtiItemForm
              id={row.id}
              values={{
                label: row.label,
                description: row.description,
                href: row.href ?? undefined,
                notApplicable: row.notApplicable,
                sortOrder: row.sortOrder,
                isPublished: row.isPublished,
              }}
            />
            <DeleteButton id={row.id} label={`item ${row.label}`} action={deleteRtiItem} />
          </div>
        )}
      />
    </div>
  );
}
