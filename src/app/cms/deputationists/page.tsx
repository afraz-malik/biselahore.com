import { asc } from "drizzle-orm";

import { db } from "@/lib/db/client";
import { deputationists } from "@/lib/db/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateDeputationistForm } from "./form";
import { DeputationistsList } from "./list";

export default async function DeputationistsAdminPage() {
  const rows = await db.select().from(deputationists).orderBy(asc(deputationists.sortOrder)).all();

  const groups = [
    { key: "chairmen" as const, label: "Chairmen", rows: rows.filter((r) => r.group === "chairmen") },
    { key: "secretaries" as const, label: "Secretaries", rows: rows.filter((r) => r.group === "secretaries") },
    { key: "ces" as const, label: "Controllers of Examinations", rows: rows.filter((r) => r.group === "ces") },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">Deputationists</h1>
        <p className="text-sm text-muted-foreground">Tenure tables for chairmen, secretaries, and CEs.</p>
      </div>

      <Tabs defaultValue="chairmen">
        <TabsList>
          {groups.map((g) => (
            <TabsTrigger key={g.key} value={g.key}>
              {g.label} ({g.rows.length})
            </TabsTrigger>
          ))}
        </TabsList>
        {groups.map((g) => (
          <TabsContent key={g.key} value={g.key} className="flex flex-col gap-4 pt-4">
            <div className="flex justify-end">
              <CreateDeputationistForm
                group={g.key}
                nextSortOrder={g.rows.length}
                nextNo={g.rows.length > 0 ? Math.max(...g.rows.map((r) => r.no)) + 1 : 1}
              />
            </div>
            <DeputationistsList rows={g.rows} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
