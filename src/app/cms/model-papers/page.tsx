import { asc } from "drizzle-orm";

import { db } from "@/lib/db/client";
import { modelPapers } from "@/lib/db/schema";
import { AdminTable } from "@/components/cms/admin-table";
import { PublishToggle } from "@/components/cms/publish-toggle";
import { DeleteButton } from "@/components/cms/delete-button";
import { ReorderButtons } from "@/components/cms/reorder-buttons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateModelPaperForm, EditModelPaperForm } from "./form";
import { deleteModelPaper, toggleModelPaperPublished, reorderModelPaper } from "./actions";

export default async function ModelPapersPage() {
  const rows = await db.select().from(modelPapers).orderBy(asc(modelPapers.sortOrder)).all();
  const ssc = rows.filter((r) => r.level === "ssc");
  const hssc = rows.filter((r) => r.level === "hssc");
  const groups = [
    { key: "ssc" as const, label: "SSC", rows: ssc },
    { key: "hssc" as const, label: "HSSC", rows: hssc },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">Model Papers</h1>
        <p className="text-sm text-muted-foreground">SSC &amp; HSSC sample papers.</p>
      </div>

      <Tabs defaultValue="ssc">
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
              <CreateModelPaperForm level={g.key} nextSortOrder={g.rows.length} />
            </div>
            <AdminTable
              rows={g.rows}
              emptyMessage="No model papers yet."
              columns={[
                { header: "Title", render: (row) => row.title },
                { header: "Link", render: (row) => <span className="text-muted-foreground">{row.href}</span> },
              ]}
              actions={(row, index) => (
                <div className="flex items-center justify-end gap-1">
                  <ReorderButtons
                    id={row.id}
                    canMoveUp={index > 0}
                    canMoveDown={index < g.rows.length - 1}
                    action={reorderModelPaper}
                  />
                  <PublishToggle id={row.id} isPublished={row.isPublished} action={toggleModelPaperPublished} />
                  <EditModelPaperForm
                    id={row.id}
                    values={{ level: row.level, title: row.title, href: row.href, sortOrder: row.sortOrder, isPublished: row.isPublished }}
                  />
                  <DeleteButton id={row.id} label={row.title} action={deleteModelPaper} />
                </div>
              )}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
