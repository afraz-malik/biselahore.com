import { asc } from "drizzle-orm";

import { db } from "@/lib/db/client";
import { socialSidebarItems } from "@/lib/db/schema";
import { AdminTable } from "@/components/cms/admin-table";
import { PublishToggle } from "@/components/cms/publish-toggle";
import { DeleteButton } from "@/components/cms/delete-button";
import { ReorderButtons } from "@/components/cms/reorder-buttons";
import { CreateSocialItemForm, EditSocialItemForm } from "./form";
import { deleteSocialItem, toggleSocialItemPublished, reorderSocialItem } from "./actions";

export default async function SocialSidebarPage() {
  const rows = await db.select().from(socialSidebarItems).orderBy(asc(socialSidebarItems.sortOrder)).all();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Social Icons</h1>
          <p className="text-sm text-muted-foreground">Floating social sidebar (homepage only).</p>
        </div>
        <CreateSocialItemForm nextSortOrder={rows.length} />
      </div>

      <AdminTable
        rows={rows}
        emptyMessage="No social icons yet."
        columns={[
          { header: "Label", render: (row) => row.label },
          { header: "Icon", render: (row) => <span className="text-muted-foreground">{row.icon}</span> },
          { header: "Link", render: (row) => <span className="text-muted-foreground">{row.href}</span> },
        ]}
        actions={(row, index) => (
          <div className="flex items-center justify-end gap-1">
            <ReorderButtons id={row.id} canMoveUp={index > 0} canMoveDown={index < rows.length - 1} action={reorderSocialItem} />
            <PublishToggle id={row.id} isPublished={row.isPublished} action={toggleSocialItemPublished} />
            <EditSocialItemForm
              id={row.id}
              values={{
                key: row.key,
                label: row.label,
                subtitle: row.subtitle ?? undefined,
                href: row.href,
                icon: row.icon,
                colorClass: row.colorClass,
                sortOrder: row.sortOrder,
                isPublished: row.isPublished,
              }}
            />
            <DeleteButton id={row.id} label={row.label} action={deleteSocialItem} />
          </div>
        )}
      />
    </div>
  );
}
