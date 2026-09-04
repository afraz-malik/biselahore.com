"use server";

import { revalidatePath } from "next/cache";

import { requireCmsAuth } from "@/lib/cms/auth/guard";
import { insertRowAtTop, updateRow, deleteRow, togglePublished, reorderRow } from "@/lib/cms/mutations";
import { tenderSchema } from "@/lib/cms/schemas";
import { tenders } from "@/lib/db/schema";

function revalidate() {
  revalidatePath("/tenders");
}

export async function createTender(values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = tenderSchema.parse(values);
  insertRowAtTop(tenders, data);
  revalidate();
}

export async function updateTender(id: number, values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = tenderSchema.parse(values);
  updateRow(tenders, id, data);
  revalidate();
}

export async function deleteTender(id: number): Promise<void> {
  await requireCmsAuth();
  deleteRow(tenders, id);
  revalidate();
}

export async function toggleTenderPublished(id: number): Promise<void> {
  await requireCmsAuth();
  togglePublished(tenders, id);
  revalidate();
}

export async function reorderTender(id: number, direction: "up" | "down"): Promise<void> {
  await requireCmsAuth();
  reorderRow(tenders, id, direction);
  revalidate();
}
