"use server";

import { revalidatePath } from "next/cache";

import { requireCmsAuth } from "@/lib/cms/auth/guard";
import { insertRow, updateRow, deleteRow, togglePublished, reorderRow } from "@/lib/cms/mutations";
import { resultStatSchema } from "@/lib/cms/schemas";
import { resultStats } from "@/lib/db/schema";

function revalidate() {
  revalidatePath("/result-statistics");
}

export async function createResultStat(values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = resultStatSchema.parse(values);
  insertRow(resultStats, data);
  revalidate();
}

export async function updateResultStat(id: number, values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = resultStatSchema.parse(values);
  updateRow(resultStats, id, data);
  revalidate();
}

export async function deleteResultStat(id: number): Promise<void> {
  await requireCmsAuth();
  deleteRow(resultStats, id);
  revalidate();
}

export async function toggleResultStatPublished(id: number): Promise<void> {
  await requireCmsAuth();
  togglePublished(resultStats, id);
  revalidate();
}

export async function reorderResultStat(id: number, direction: "up" | "down"): Promise<void> {
  await requireCmsAuth();
  reorderRow(resultStats, id, direction);
  revalidate();
}
