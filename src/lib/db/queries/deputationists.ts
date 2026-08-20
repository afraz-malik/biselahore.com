import "server-only";

import { and, asc, eq } from "drizzle-orm";

import { db } from "@/lib/db/client";
import * as schema from "@/lib/db/schema";
import type { TenureRow } from "@/lib/deputationists-data";

export async function getPublishedDeputationists(group: "chairmen" | "secretaries" | "ces"): Promise<TenureRow[]> {
  const rows = await db
    .select()
    .from(schema.deputationists)
    .where(and(eq(schema.deputationists.group, group), eq(schema.deputationists.isPublished, true)))
    .orderBy(asc(schema.deputationists.sortOrder))
    .all();

  return rows.map((row) => ({
    no: row.no,
    name: row.name,
    from: row.fromDate,
    to: row.toDate,
  }));
}
