import "server-only";

import { asc, eq } from "drizzle-orm";

import { db } from "@/lib/db/client";
import * as schema from "@/lib/db/schema";

export async function getPublishedTenders() {
  return db
    .select()
    .from(schema.tenders)
    .where(eq(schema.tenders.isPublished, true))
    .orderBy(asc(schema.tenders.sortOrder))
    .all();
}
