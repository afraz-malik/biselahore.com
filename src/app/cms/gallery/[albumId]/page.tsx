import Link from "next/link";
import { notFound } from "next/navigation";
import { asc, eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

import { db } from "@/lib/db/client";
import { galleryAlbums, galleryImages } from "@/lib/db/schema";
import { DeleteButton } from "@/components/cms/delete-button";
import { ReorderButtons } from "@/components/cms/reorder-buttons";
import { Button } from "@/components/ui/button";
import { CreateGalleryImageForm, EditGalleryImageForm } from "../image-form";
import { deleteGalleryImage, reorderGalleryImage } from "../actions";

export default async function GalleryAlbumImagesPage({ params }: { params: Promise<{ albumId: string }> }) {
  const { albumId: albumIdParam } = await params;
  const albumId = Number(albumIdParam);
  if (!Number.isFinite(albumId)) {
    notFound();
  }

  const album = await db.select().from(galleryAlbums).where(eq(galleryAlbums.id, albumId)).get();
  if (!album) {
    notFound();
  }

  const images = await db
    .select()
    .from(galleryImages)
    .where(eq(galleryImages.albumId, albumId))
    .orderBy(asc(galleryImages.sortOrder))
    .all();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Button variant="ghost" size="sm" nativeButton={false} render={<Link href="/cms/gallery" />}>
          <ArrowLeft className="size-4" />
          Back to albums
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">{album.title}</h1>
          <p className="text-sm text-muted-foreground">{images.length} images</p>
        </div>
        <CreateGalleryImageForm albumId={album.id} nextSortOrder={images.length} />
      </div>

      {images.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          No images in this album yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((image, index) => (
            <div key={image.id} className="flex flex-col gap-2 rounded-xl border border-border bg-card p-3">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary">
                <Image src={image.thumb} alt={image.alt} fill sizes="200px" className="object-cover" />
              </div>
              <p className="truncate text-xs text-muted-foreground">{image.alt}</p>
              <div className="flex items-center justify-between">
                <ReorderButtons id={image.id} canMoveUp={index > 0} canMoveDown={index < images.length - 1} action={reorderGalleryImage} />
                <div className="flex items-center gap-1">
                  <EditGalleryImageForm
                    id={image.id}
                    values={{ albumId: image.albumId, full: image.full, thumb: image.thumb, alt: image.alt, sortOrder: image.sortOrder }}
                  />
                  <DeleteButton id={image.id} label={image.alt} action={deleteGalleryImage} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
