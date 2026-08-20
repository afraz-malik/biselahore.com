import { asc } from "drizzle-orm";

import { db } from "@/lib/db/client";
import { downloads } from "@/lib/db/schema";
import { CreateDownloadForm } from "./form";
import { DownloadsList } from "./list";

export default async function DownloadsAdminPage() {
  const rows = await db.select().from(downloads).orderBy(asc(downloads.sortOrder)).all();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Downloads</h1>
          <p className="text-sm text-muted-foreground">{rows.length} total. Public forms list at /downloads.</p>
        </div>
        <CreateDownloadForm nextSortOrder={rows.length} />
      </div>

      <DownloadsList rows={rows} />
    </div>
  );
}
