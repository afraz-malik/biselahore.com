import { asc } from "drizzle-orm";

import { db } from "@/lib/db/client";
import { aboutSections } from "@/lib/db/schema";
import { AdminTable } from "@/components/cms/admin-table";
import { PublishToggle } from "@/components/cms/publish-toggle";
import { DeleteButton } from "@/components/cms/delete-button";
import { ReorderButtons } from "@/components/cms/reorder-buttons";
import { CreateAboutSectionForm, EditAboutSectionForm } from "./form";
import { deleteAboutSection, toggleAboutSectionPublished, reorderAboutSection } from "./actions";

export default async function AboutAdminPage() {
  const rows = await db.select().from(aboutSections).orderBy(asc(aboutSections.sortOrder)).all();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">About</h1>
          <p className="text-sm text-muted-foreground">Sections shown on /about.</p>
        </div>
        <CreateAboutSectionForm nextSortOrder={rows.length} />
      </div>

      <AdminTable
        rows={rows}
        emptyMessage="No sections yet."
        columns={[
          { header: "Title", render: (row) => row.title },
          { header: "Slug", render: (row) => <span className="text-muted-foreground">{row.slug}</span> },
        ]}
        actions={(row, index) => (
          <div className="flex items-center justify-end gap-1">
            <ReorderButtons id={row.id} canMoveUp={index > 0} canMoveDown={index < rows.length - 1} action={reorderAboutSection} />
            <PublishToggle id={row.id} isPublished={row.isPublished} action={toggleAboutSectionPublished} />
            <EditAboutSectionForm
              id={row.id}
              values={{
                slug: row.slug,
                title: row.title,
                body: row.body,
                listItems: row.listItems,
                ordered: row.ordered,
                sortOrder: row.sortOrder,
                isPublished: row.isPublished,
              }}
            />
            <DeleteButton id={row.id} label={row.title} action={deleteAboutSection} />
          </div>
        )}
      />
    </div>
  );
}
