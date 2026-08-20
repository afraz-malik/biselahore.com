import "server-only";

import { asc, eq } from "drizzle-orm";

import { db } from "@/lib/db/client";
import * as schema from "@/lib/db/schema";

export async function getPublishedCareers() {
  return db
    .select()
    .from(schema.careers)
    .where(eq(schema.careers.isPublished, true))
    .orderBy(asc(schema.careers.sortOrder))
    .all();
}
