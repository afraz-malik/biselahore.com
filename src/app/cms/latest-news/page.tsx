import { asc } from "drizzle-orm";

import { db } from "@/lib/db/client";
import { newsPreview } from "@/lib/db/schema";
import { AdminTable } from "@/components/cms/admin-table";
import { PublishToggle } from "@/components/cms/publish-toggle";
import { DeleteButton } from "@/components/cms/delete-button";
import { ReorderButtons } from "@/components/cms/reorder-buttons";
import { Badge } from "@/components/ui/badge";
import { CreateNewsItemForm, EditNewsItemForm } from "./form";
import { deleteNewsItem, toggleNewsItemPublished, reorderNewsItem } from "./actions";

export default async function LatestNewsPage() {
  const rows = await db.select().from(newsPreview).orderBy(asc(newsPreview.sortOrder)).all();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Latest News</h1>
          <p className="text-sm text-muted-foreground">Homepage scrolling news preview.</p>
        </div>
        <CreateNewsItemForm nextSortOrder={rows.length} />
      </div>

      <AdminTable
        rows={rows}
        emptyMessage="No news items yet."
        columns={[
          {
            header: "Title",
            render: (row) => (
              <span className="flex items-center gap-2">
                {row.title}
                {row.urgent ? <Badge variant="destructive">Urgent</Badge> : null}
              </span>
            ),
          },
          { header: "Link", render: (row) => <span className="text-muted-foreground">{row.href}</span> },
        ]}
        actions={(row, index) => (
          <div className="flex items-center justify-end gap-1">
            <ReorderButtons id={row.id} canMoveUp={index > 0} canMoveDown={index < rows.length - 1} action={reorderNewsItem} />
            <PublishToggle id={row.id} isPublished={row.isPublished} action={toggleNewsItemPublished} />
            <EditNewsItemForm
              id={row.id}
              values={{ title: row.title, href: row.href, urgent: row.urgent, sortOrder: row.sortOrder, isPublished: row.isPublished }}
            />
            <DeleteButton id={row.id} label={row.title} action={deleteNewsItem} />
          </div>
        )}
      />
    </div>
  );
}
