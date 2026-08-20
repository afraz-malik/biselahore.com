import Link from "next/link";
import { asc, count } from "drizzle-orm";
import { Images } from "lucide-react";

import { db } from "@/lib/db/client";
import { galleryAlbums, galleryImages } from "@/lib/db/schema";
import { AdminTable } from "@/components/cms/admin-table";
import { PublishToggle } from "@/components/cms/publish-toggle";
import { DeleteButton } from "@/components/cms/delete-button";
import { ReorderButtons } from "@/components/cms/reorder-buttons";
import { Button } from "@/components/ui/button";
import { CreateGalleryAlbumForm, EditGalleryAlbumForm } from "./album-form";
import { deleteGalleryAlbum, toggleGalleryAlbumPublished, reorderGalleryAlbum } from "./actions";

export default async function GalleryAdminPage() {
  const rows = await db.select().from(galleryAlbums).orderBy(asc(galleryAlbums.sortOrder)).all();
  const imageCounts = await db
    .select({ albumId: galleryImages.albumId, value: count() })
    .from(galleryImages)
    .groupBy(galleryImages.albumId)
    .all();
  const countByAlbum = new Map(imageCounts.map((r) => [r.albumId, r.value]));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Photo Gallery</h1>
          <p className="text-sm text-muted-foreground">Albums shown at /gallery. Manage images within each album.</p>
        </div>
        <CreateGalleryAlbumForm nextSortOrder={rows.length} />
      </div>

      <AdminTable
        rows={rows}
        emptyMessage="No albums yet."
        columns={[
          { header: "Title", render: (row) => row.title },
          { header: "Date", render: (row) => <span className="text-muted-foreground">{row.date}</span> },
          { header: "Images", render: (row) => countByAlbum.get(row.id) ?? 0 },
        ]}
        actions={(row, index) => (
          <div className="flex items-center justify-end gap-1">
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Manage images"
              nativeButton={false}
              render={<Link href={`/cms/gallery/${row.id}`} />}
            >
              <Images className="size-4" />
            </Button>
            <ReorderButtons id={row.id} canMoveUp={index > 0} canMoveDown={index < rows.length - 1} action={reorderGalleryAlbum} />
            <PublishToggle id={row.id} isPublished={row.isPublished} action={toggleGalleryAlbumPublished} />
            <EditGalleryAlbumForm id={row.id} values={{ slug: row.slug, title: row.title, date: row.date, sortOrder: row.sortOrder, isPublished: row.isPublished }} />
            <DeleteButton id={row.id} label={row.title} action={deleteGalleryAlbum} />
          </div>
        )}
      />
    </div>
  );
}
