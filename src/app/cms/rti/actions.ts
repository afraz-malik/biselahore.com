"use server";

import { revalidatePath } from "next/cache";

import { requireCmsAuth } from "@/lib/cms/auth/guard";
import { insertRowAtTop, updateRow, deleteRow, togglePublished, reorderRow } from "@/lib/cms/mutations";
import { rtiItemSchema } from "@/lib/cms/schemas";
import { rtiItems } from "@/lib/db/schema";

function revalidate() {
  revalidatePath("/rti");
}

export async function createRtiItem(values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = rtiItemSchema.parse(values);
  insertRowAtTop(rtiItems, data);
  revalidate();
}

export async function updateRtiItem(id: number, values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = rtiItemSchema.parse(values);
  updateRow(rtiItems, id, data);
  revalidate();
}

export async function deleteRtiItem(id: number): Promise<void> {
  await requireCmsAuth();
  deleteRow(rtiItems, id);
  revalidate();
}

export async function toggleRtiItemPublished(id: number): Promise<void> {
  await requireCmsAuth();
  togglePublished(rtiItems, id);
  revalidate();
}

export async function reorderRtiItem(id: number, direction: "up" | "down"): Promise<void> {
  await requireCmsAuth();
  reorderRow(rtiItems, id, direction);
  revalidate();
}
