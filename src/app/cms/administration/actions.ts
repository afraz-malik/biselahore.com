"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import { requireCmsAuth } from "@/lib/cms/auth/guard";
import { db } from "@/lib/db/client";
import { officials } from "@/lib/db/schema";
import { officialSchema } from "@/lib/cms/schemas";

export async function updateOfficial(id: number, values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = officialSchema.parse(values);
  db.update(officials).set(data).where(eq(officials.id, id)).run();
  revalidatePath(`/administration/${data.roleSlug === "controller" ? "controller-of-examinations" : data.roleSlug}`);
  revalidatePath("/contact");
}
