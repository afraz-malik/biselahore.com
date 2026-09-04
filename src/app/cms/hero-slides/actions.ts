"use server";

import { revalidatePath } from "next/cache";

import { requireCmsAuth } from "@/lib/cms/auth/guard";
import { insertRowAtTop, updateRow, deleteRow, togglePublished, reorderRow } from "@/lib/cms/mutations";
import { heroSlideSchema } from "@/lib/cms/schemas";
import { heroSlides } from "@/lib/db/schema";

function revalidate() {
  revalidatePath("/");
}

export async function createHeroSlide(values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = heroSlideSchema.parse(values);
  insertRowAtTop(heroSlides, data);
  revalidate();
}

export async function updateHeroSlide(id: number, values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = heroSlideSchema.parse(values);
  updateRow(heroSlides, id, data);
  revalidate();
}

export async function deleteHeroSlide(id: number): Promise<void> {
  await requireCmsAuth();
  deleteRow(heroSlides, id);
  revalidate();
}

export async function toggleHeroSlidePublished(id: number): Promise<void> {
  await requireCmsAuth();
  togglePublished(heroSlides, id);
  revalidate();
}

export async function reorderHeroSlide(id: number, direction: "up" | "down"): Promise<void> {
  await requireCmsAuth();
  reorderRow(heroSlides, id, direction);
  revalidate();
}
