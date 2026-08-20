"use server";

import { revalidatePath } from "next/cache";

import { requireCmsAuth } from "@/lib/cms/auth/guard";
import { insertRow, updateRow, deleteRow, togglePublished, reorderRow } from "@/lib/cms/mutations";
import { careerSchema } from "@/lib/cms/schemas";
import { careers } from "@/lib/db/schema";

function revalidate() {
  revalidatePath("/careers");
}

export async function createCareer(values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = careerSchema.parse(values);
  insertRow(careers, data);
  revalidate();
}

export async function updateCareer(id: number, values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = careerSchema.parse(values);
  updateRow(careers, id, data);
  revalidate();
}

export async function deleteCareer(id: number): Promise<void> {
  await requireCmsAuth();
  deleteRow(careers, id);
  revalidate();
}

export async function toggleCareerPublished(id: number): Promise<void> {
  await requireCmsAuth();
  togglePublished(careers, id);
  revalidate();
}

export async function reorderCareer(id: number, direction: "up" | "down"): Promise<void> {
  await requireCmsAuth();
  reorderRow(careers, id, direction);
  revalidate();
}
