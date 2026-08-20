import { asc } from "drizzle-orm";

import { db } from "@/lib/db/client";
import { careers } from "@/lib/db/schema";
import { AdminTable } from "@/components/cms/admin-table";
import { PublishToggle } from "@/components/cms/publish-toggle";
import { DeleteButton } from "@/components/cms/delete-button";
import { ReorderButtons } from "@/components/cms/reorder-buttons";
import { CreateCareerForm, EditCareerForm } from "./form";
import { deleteCareer, toggleCareerPublished, reorderCareer } from "./actions";

export default async function CareersAdminPage() {
  const rows = await db.select().from(careers).orderBy(asc(careers.sortOrder)).all();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Careers</h1>
          <p className="text-sm text-muted-foreground">Job openings at /careers. Empty list shows &quot;no jobs available&quot;.</p>
        </div>
        <CreateCareerForm nextSortOrder={rows.length} />
      </div>

      <AdminTable
        rows={rows}
        emptyMessage="No openings yet."
        columns={[
          { header: "Title", render: (row) => row.title },
          { header: "Link", render: (row) => <span className="text-muted-foreground">{row.href}</span> },
        ]}
        actions={(row, index) => (
          <div className="flex items-center justify-end gap-1">
            <ReorderButtons id={row.id} canMoveUp={index > 0} canMoveDown={index < rows.length - 1} action={reorderCareer} />
            <PublishToggle id={row.id} isPublished={row.isPublished} action={toggleCareerPublished} />
            <EditCareerForm id={row.id} values={{ title: row.title, href: row.href, sortOrder: row.sortOrder, isPublished: row.isPublished }} />
            <DeleteButton id={row.id} label={row.title} action={deleteCareer} />
          </div>
        )}
      />
    </div>
  );
}
