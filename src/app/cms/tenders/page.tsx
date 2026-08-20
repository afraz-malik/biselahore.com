import { asc } from "drizzle-orm";

import { db } from "@/lib/db/client";
import { tenders } from "@/lib/db/schema";
import { CreateTenderForm } from "./form";
import { TendersList } from "./list";

export default async function TendersAdminPage() {
  const rows = await db.select().from(tenders).orderBy(asc(tenders.sortOrder)).all();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Tenders</h1>
          <p className="text-sm text-muted-foreground">{rows.length} total. Public list at /tenders.</p>
        </div>
        <CreateTenderForm nextSortOrder={rows.length} />
      </div>

      <TendersList rows={rows} />
    </div>
  );
}
