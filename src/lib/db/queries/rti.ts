import "server-only";

import { asc, eq } from "drizzle-orm";

import { db } from "@/lib/db/client";
import * as schema from "@/lib/db/schema";

export async function getPublishedRtiItems() {
  return db
    .select()
    .from(schema.rtiItems)
    .where(eq(schema.rtiItems.isPublished, true))
    .orderBy(asc(schema.rtiItems.sortOrder))
    .all();
}
