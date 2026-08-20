import "server-only";

import { asc, eq } from "drizzle-orm";

import { db } from "@/lib/db/client";
import * as schema from "@/lib/db/schema";
import type { GalleryAlbum } from "@/lib/gallery-data";

export async function getPublishedGalleryAlbums(): Promise<GalleryAlbum[]> {
  const albums = await db
    .select()
    .from(schema.galleryAlbums)
    .where(eq(schema.galleryAlbums.isPublished, true))
    .orderBy(asc(schema.galleryAlbums.sortOrder))
    .all();

  const albumsWithImages = await Promise.all(
    albums.map(async (album) => {
      const images = await db
        .select()
        .from(schema.galleryImages)
        .where(eq(schema.galleryImages.albumId, album.id))
        .orderBy(asc(schema.galleryImages.sortOrder))
        .all();

      return {
        id: album.slug,
        date: album.date,
        title: album.title,
        images: images.map((img) => ({ full: img.full, thumb: img.thumb, alt: img.alt })),
      };
    })
  );

  return albumsWithImages;
}
