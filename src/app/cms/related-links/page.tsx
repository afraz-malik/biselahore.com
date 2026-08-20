import { asc } from "drizzle-orm";

import { db } from "@/lib/db/client";
import { relatedLinks } from "@/lib/db/schema";
import { AdminTable } from "@/components/cms/admin-table";
import { PublishToggle } from "@/components/cms/publish-toggle";
import { DeleteButton } from "@/components/cms/delete-button";
import { ReorderButtons } from "@/components/cms/reorder-buttons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateRelatedLinkForm, EditRelatedLinkForm } from "./form";
import { deleteRelatedLink, toggleRelatedLinkPublished, reorderRelatedLink } from "./actions";

export default async function RelatedLinksPage() {
  const rows = await db.select().from(relatedLinks).orderBy(asc(relatedLinks.sortOrder)).all();
  const boards = rows.filter((r) => r.group === "boards");
  const organizations = rows.filter((r) => r.group === "organizations");

  const groups = [
    { key: "boards" as const, label: "Other Education Boards", rows: boards },
    { key: "organizations" as const, label: "Government & Partner Organizations", rows: organizations },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">Related Links</h1>
        <p className="text-sm text-muted-foreground">Homepage &quot;Related Links&quot; section.</p>
      </div>

      <Tabs defaultValue="boards">
        <TabsList>
          {groups.map((g) => (
            <TabsTrigger key={g.key} value={g.key}>
              {g.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {groups.map((g) => (
          <TabsContent key={g.key} value={g.key} className="flex flex-col gap-4 pt-4">
            <div className="flex justify-end">
              <CreateRelatedLinkForm group={g.key} nextSortOrder={g.rows.length} />
            </div>
            <AdminTable
              rows={g.rows}
              emptyMessage="No links yet."
              columns={[
                { header: "Label", render: (row) => row.label },
                { header: "Link", render: (row) => <span className="text-muted-foreground">{row.href}</span> },
              ]}
              actions={(row, index) => (
                <div className="flex items-center justify-end gap-1">
                  <ReorderButtons
                    id={row.id}
                    canMoveUp={index > 0}
                    canMoveDown={index < g.rows.length - 1}
                    action={reorderRelatedLink}
                  />
                  <PublishToggle id={row.id} isPublished={row.isPublished} action={toggleRelatedLinkPublished} />
                  <EditRelatedLinkForm
                    id={row.id}
                    values={{ group: row.group, label: row.label, href: row.href, sortOrder: row.sortOrder, isPublished: row.isPublished }}
                  />
                  <DeleteButton id={row.id} label={row.label} action={deleteRelatedLink} />
                </div>
              )}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
