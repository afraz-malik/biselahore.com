"use server";

import { revalidatePath } from "next/cache";

import { requireCmsAuth } from "@/lib/cms/auth/guard";
import { insertRowAtTop, updateRow, deleteRow, togglePublished, reorderRow } from "@/lib/cms/mutations";
import { modelPaperSchema } from "@/lib/cms/schemas";
import { modelPapers } from "@/lib/db/schema";

function revalidate() {
  revalidatePath("/model-papers/ssc");
  revalidatePath("/model-papers/hssc");
}

export async function createModelPaper(values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = modelPaperSchema.parse(values);
  insertRowAtTop(modelPapers, data, { column: modelPapers.level, value: data.level });
  revalidate();
}

export async function updateModelPaper(id: number, values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = modelPaperSchema.parse(values);
  updateRow(modelPapers, id, data);
  revalidate();
}

export async function deleteModelPaper(id: number): Promise<void> {
  await requireCmsAuth();
  deleteRow(modelPapers, id);
  revalidate();
}

export async function toggleModelPaperPublished(id: number): Promise<void> {
  await requireCmsAuth();
  togglePublished(modelPapers, id);
  revalidate();
}

export async function reorderModelPaper(id: number, direction: "up" | "down"): Promise<void> {
  await requireCmsAuth();
  reorderRow(modelPapers, id, direction);
  revalidate();
}
