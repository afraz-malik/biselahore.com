import { asc } from "drizzle-orm";

import { db } from "@/lib/db/client";
import { announcements } from "@/lib/db/schema";
import { AdminTable } from "@/components/cms/admin-table";
import { PublishToggle } from "@/components/cms/publish-toggle";
import { DeleteButton } from "@/components/cms/delete-button";
import { ReorderButtons } from "@/components/cms/reorder-buttons";
import { Badge } from "@/components/ui/badge";
import { CreateAnnouncementForm, EditAnnouncementForm } from "./form";
import { deleteAnnouncement, toggleAnnouncementPublished, reorderAnnouncement } from "./actions";

export default async function AnnouncementsPage() {
  const rows = await db.select().from(announcements).orderBy(asc(announcements.sortOrder)).all();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Announcements</h1>
          <p className="text-sm text-muted-foreground">Homepage announcement bar &amp; sheet list.</p>
        </div>
        <CreateAnnouncementForm nextSortOrder={rows.length} />
      </div>

      <AdminTable
        rows={rows}
        emptyMessage="No announcements yet."
        columns={[
          {
            header: "Title",
            render: (row) => (
              <span className="flex items-center gap-2">
                {row.title}
                {row.isNew ? <Badge>New</Badge> : null}
              </span>
            ),
          },
          {
            header: "Link",
            render: (row) => <span className="text-muted-foreground">{row.href}</span>,
          },
        ]}
        actions={(row, index) => (
          <div className="flex items-center justify-end gap-1">
            <ReorderButtons
              id={row.id}
              canMoveUp={index > 0}
              canMoveDown={index < rows.length - 1}
              action={reorderAnnouncement}
            />
            <PublishToggle id={row.id} isPublished={row.isPublished} action={toggleAnnouncementPublished} />
            <EditAnnouncementForm
              id={row.id}
              values={{
                title: row.title,
                href: row.href,
                isNew: row.isNew,
                sortOrder: row.sortOrder,
                isPublished: row.isPublished,
              }}
            />
            <DeleteButton id={row.id} label={row.title} action={deleteAnnouncement} />
          </div>
        )}
      />
    </div>
  );
}
