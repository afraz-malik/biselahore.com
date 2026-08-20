import "server-only";

import { asc, eq } from "drizzle-orm";

import { db } from "@/lib/db/client";
import * as schema from "@/lib/db/schema";
import type { ResultYearRow } from "@/lib/result-stats-data";

function pair(label: string | null, href: string | null) {
  return { label: label ?? "—", href };
}

export async function getPublishedResultStats(): Promise<ResultYearRow[]> {
  const rows = await db
    .select()
    .from(schema.resultStats)
    .where(eq(schema.resultStats.isPublished, true))
    .orderBy(asc(schema.resultStats.sortOrder))
    .all();

  return rows.map((row) => ({
    year: row.year,
    ssc9th: pair(row.ssc9thLabel, row.ssc9thHref),
    ssc10th: pair(row.ssc10thLabel, row.ssc10thHref),
    sscSupply: pair(row.sscSupplyLabel, row.sscSupplyHref),
    hssc11th: pair(row.hssc11thLabel, row.hssc11thHref),
    hssc12th: pair(row.hssc12thLabel, row.hssc12thHref),
    hsscSupply: pair(row.hsscSupplyLabel, row.hsscSupplyHref),
  }));
}
