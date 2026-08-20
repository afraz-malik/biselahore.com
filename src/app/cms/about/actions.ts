"use server";

import { revalidatePath } from "next/cache";

import { requireCmsAuth } from "@/lib/cms/auth/guard";
import { insertRow, updateRow, deleteRow, togglePublished, reorderRow } from "@/lib/cms/mutations";
import { aboutSectionSchema } from "@/lib/cms/schemas";
import { aboutSections } from "@/lib/db/schema";

function revalidate() {
  revalidatePath("/about");
}

export async function createAboutSection(values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = aboutSectionSchema.parse(values);
  insertRow(aboutSections, data);
  revalidate();
}

export async function updateAboutSection(id: number, values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = aboutSectionSchema.parse(values);
  updateRow(aboutSections, id, data);
  revalidate();
}

export async function deleteAboutSection(id: number): Promise<void> {
  await requireCmsAuth();
  deleteRow(aboutSections, id);
  revalidate();
}

export async function toggleAboutSectionPublished(id: number): Promise<void> {
  await requireCmsAuth();
  togglePublished(aboutSections, id);
  revalidate();
}

export async function reorderAboutSection(id: number, direction: "up" | "down"): Promise<void> {
  await requireCmsAuth();
  reorderRow(aboutSections, id, direction);
  revalidate();
}
