import "server-only";

import { asc, eq } from "drizzle-orm";

import { db } from "@/lib/db/client";
import * as schema from "@/lib/db/schema";

export async function getPublishedNotifications() {
  return db
    .select()
    .from(schema.notifications)
    .where(eq(schema.notifications.isPublished, true))
    .orderBy(asc(schema.notifications.sortOrder))
    .all();
}
