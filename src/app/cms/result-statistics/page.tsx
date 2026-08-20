import { asc } from "drizzle-orm";

import { db } from "@/lib/db/client";
import { resultStats } from "@/lib/db/schema";
import { AdminTable } from "@/components/cms/admin-table";
import { PublishToggle } from "@/components/cms/publish-toggle";
import { DeleteButton } from "@/components/cms/delete-button";
import { ReorderButtons } from "@/components/cms/reorder-buttons";
import { CreateResultStatForm, EditResultStatForm } from "./form";
import { deleteResultStat, toggleResultStatPublished, reorderResultStat } from "./actions";

export default async function ResultStatisticsAdminPage() {
  const rows = await db.select().from(resultStats).orderBy(asc(resultStats.sortOrder)).all();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Result Statistics</h1>
          <p className="text-sm text-muted-foreground">Year rows shown at /result-statistics.</p>
        </div>
        <CreateResultStatForm nextSortOrder={rows.length} />
      </div>

      <AdminTable
        rows={rows}
        emptyMessage="No year rows yet."
        columns={[{ header: "Year", render: (row) => String(row.year) }]}
        actions={(row, index) => (
          <div className="flex items-center justify-end gap-1">
            <ReorderButtons id={row.id} canMoveUp={index > 0} canMoveDown={index < rows.length - 1} action={reorderResultStat} />
            <PublishToggle id={row.id} isPublished={row.isPublished} action={toggleResultStatPublished} />
            <EditResultStatForm
              id={row.id}
              values={{
                year: row.year,
                ssc9thLabel: row.ssc9thLabel ?? undefined,
                ssc9thHref: row.ssc9thHref ?? undefined,
                ssc10thLabel: row.ssc10thLabel ?? undefined,
                ssc10thHref: row.ssc10thHref ?? undefined,
                sscSupplyLabel: row.sscSupplyLabel ?? undefined,
                sscSupplyHref: row.sscSupplyHref ?? undefined,
                hssc11thLabel: row.hssc11thLabel ?? undefined,
                hssc11thHref: row.hssc11thHref ?? undefined,
                hssc12thLabel: row.hssc12thLabel ?? undefined,
                hssc12thHref: row.hssc12thHref ?? undefined,
                hsscSupplyLabel: row.hsscSupplyLabel ?? undefined,
                hsscSupplyHref: row.hsscSupplyHref ?? undefined,
                sortOrder: row.sortOrder,
                isPublished: row.isPublished,
              }}
            />
            <DeleteButton id={row.id} label={String(row.year)} action={deleteResultStat} />
          </div>
        )}
      />
    </div>
  );
}
