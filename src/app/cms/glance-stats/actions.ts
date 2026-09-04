"use server";

import { revalidatePath } from "next/cache";

import { requireCmsAuth } from "@/lib/cms/auth/guard";
import { insertRowAtTop, updateRow, deleteRow, togglePublished, reorderRow } from "@/lib/cms/mutations";
import { glanceStatSchema } from "@/lib/cms/schemas";
import { glanceStats } from "@/lib/db/schema";

function revalidate() {
  revalidatePath("/");
}

export async function createGlanceStat(values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = glanceStatSchema.parse(values);
  insertRowAtTop(glanceStats, data);
  revalidate();
}

export async function updateGlanceStat(id: number, values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = glanceStatSchema.parse(values);
  updateRow(glanceStats, id, data);
  revalidate();
}

export async function deleteGlanceStat(id: number): Promise<void> {
  await requireCmsAuth();
  deleteRow(glanceStats, id);
  revalidate();
}

export async function toggleGlanceStatPublished(id: number): Promise<void> {
  await requireCmsAuth();
  togglePublished(glanceStats, id);
  revalidate();
}

export async function reorderGlanceStat(id: number, direction: "up" | "down"): Promise<void> {
  await requireCmsAuth();
  reorderRow(glanceStats, id, direction);
  revalidate();
}
