"use server";

import { revalidatePath } from "next/cache";

import { requireCmsAuth } from "@/lib/cms/auth/guard";
import { insertRow, updateRow, deleteRow, togglePublished, reorderRow } from "@/lib/cms/mutations";
import { galleryAlbumSchema, galleryImageSchema } from "@/lib/cms/schemas";
import { galleryAlbums, galleryImages } from "@/lib/db/schema";
import { db } from "@/lib/db/client";
import { asc, eq } from "drizzle-orm";

function revalidate() {
  revalidatePath("/gallery");
}

export async function createGalleryAlbum(values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = galleryAlbumSchema.parse(values);
  insertRow(galleryAlbums, data);
  revalidate();
}

export async function updateGalleryAlbum(id: number, values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = galleryAlbumSchema.parse(values);
  updateRow(galleryAlbums, id, data);
  revalidate();
}

export async function deleteGalleryAlbum(id: number): Promise<void> {
  await requireCmsAuth();
  deleteRow(galleryAlbums, id);
  revalidate();
}

export async function toggleGalleryAlbumPublished(id: number): Promise<void> {
  await requireCmsAuth();
  togglePublished(galleryAlbums, id);
  revalidate();
}

export async function reorderGalleryAlbum(id: number, direction: "up" | "down"): Promise<void> {
  await requireCmsAuth();
  reorderRow(galleryAlbums, id, direction);
  revalidate();
}

export async function createGalleryImage(values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = galleryImageSchema.parse(values);
  insertRow(galleryImages, data);
  revalidate();
}

export async function updateGalleryImage(id: number, values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = galleryImageSchema.parse(values);
  updateRow(galleryImages, id, data);
  revalidate();
}

export async function deleteGalleryImage(id: number): Promise<void> {
  await requireCmsAuth();
  deleteRow(galleryImages, id);
  revalidate();
}

export async function reorderGalleryImage(id: number, direction: "up" | "down"): Promise<void> {
  await requireCmsAuth();
  const image = db.select({ albumId: galleryImages.albumId }).from(galleryImages).where(eq(galleryImages.id, id)).get();
  if (!image) return;

  const rows = db
    .select({ id: galleryImages.id, sortOrder: galleryImages.sortOrder })
    .from(galleryImages)
    .where(eq(galleryImages.albumId, image.albumId))
    .orderBy(asc(galleryImages.sortOrder))
    .all();

  const index = rows.findIndex((r) => r.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapIndex < 0 || swapIndex >= rows.length) return;

  const current = rows[index];
  const swapWith = rows[swapIndex];
  updateRow(galleryImages, current.id, { sortOrder: swapWith.sortOrder });
  updateRow(galleryImages, swapWith.id, { sortOrder: current.sortOrder });
  revalidate();
}
