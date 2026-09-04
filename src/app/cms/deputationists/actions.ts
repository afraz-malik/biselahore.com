"use server";

import { revalidatePath } from "next/cache";

import { requireCmsAuth } from "@/lib/cms/auth/guard";
import { insertRowAtTop, updateRow, deleteRow, togglePublished, reorderRow } from "@/lib/cms/mutations";
import { deputationistSchema } from "@/lib/cms/schemas";
import { deputationists } from "@/lib/db/schema";

function revalidate() {
  revalidatePath("/deputationists/chairmen");
  revalidatePath("/deputationists/secretaries");
  revalidatePath("/deputationists/ces");
}

export async function createDeputationist(values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = deputationistSchema.parse(values);
  insertRowAtTop(deputationists, data, { column: deputationists.group, value: data.group });
  revalidate();
}

export async function updateDeputationist(id: number, values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = deputationistSchema.parse(values);
  updateRow(deputationists, id, data);
  revalidate();
}

export async function deleteDeputationist(id: number): Promise<void> {
  await requireCmsAuth();
  deleteRow(deputationists, id);
  revalidate();
}

export async function toggleDeputationistPublished(id: number): Promise<void> {
  await requireCmsAuth();
  togglePublished(deputationists, id);
  revalidate();
}

export async function reorderDeputationist(id: number, direction: "up" | "down"): Promise<void> {
  await requireCmsAuth();
  reorderRow(deputationists, id, direction);
  revalidate();
}
